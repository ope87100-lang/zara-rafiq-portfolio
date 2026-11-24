import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const SHOTS_DIR =
  'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\03429278-a8c9-43ea-9ebb-fe707c5eb289\\screenshots';

fs.mkdirSync(path.join(SHOTS_DIR, 'desktop'), { recursive: true });
fs.mkdirSync(path.join(SHOTS_DIR, 'mobile'), { recursive: true });

const ROUTES = [
  { slug: 'home', path: '/' },
  { slug: 'about', path: '/about' },
  { slug: 'skills', path: '/skills' },
  { slug: 'portfolio', path: '/portfolio' },
  { slug: 'project-ebay', path: '/portfolio/ebay-listing-practice' },
  { slug: 'project-canva', path: '/portfolio/digital-marketing-canva' },
  { slug: 'education', path: '/education' },
  { slug: 'contact', path: '/contact' },
  { slug: 'privacy', path: '/privacy' },
  { slug: 'not-found', path: '/does-not-exist' },
];

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      'cmd.exe',
      ['/c', 'npx.cmd', 'vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );

    const timeout = setTimeout(() => {
      proc.kill();
      reject(new Error('Preview server startup timeout'));
    }, 20000);

    const onData = (chunk) => {
      const text = chunk.toString();
      if (text.includes('127.0.0.1') || text.includes('localhost')) {
        clearTimeout(timeout);
        resolve(proc);
      }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

async function checkHorizontalOverflow(page, label) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (scrollWidth > clientWidth) {
    throw new Error(`Horizontal overflow detected at ${label}: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
  }
}

async function scrollEntirePage(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

async function checkLoadedImages(page, label) {
  await page.waitForFunction(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.every((img) => img.complete && img.naturalWidth > 0);
  }, null, { timeout: 10000 }).catch(() => {});

  const broken = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute('src'));
  });
  if (broken.length > 0) {
    throw new Error(`Broken images on ${label}: ${broken.join(', ')}`);
  }
}

async function run() {
  const server = await startPreviewServer();
  const consoleErrors = [];
  const failedRequests = [];

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  try {
    // 1. DESKTOP SUITE (1440x900)
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktopCtx.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[desktop console] ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(`[desktop pageerror] ${err.message}`);
    });
    page.on('response', (res) => {
      if (res.url().startsWith(BASE_URL) && res.status() >= 400) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });

    // Capture hero fold + full page of every route
    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(450);
      await scrollEntirePage(page);
      await checkHorizontalOverflow(page, `desktop ${route.path}`);
      await checkLoadedImages(page, `desktop ${route.path}`);

      if (route.slug === 'home') {
        await page.screenshot({
          path: path.join(SHOTS_DIR, 'desktop', '00-home-fold.png'),
          fullPage: false,
        });
      }
      await page.screenshot({
        path: path.join(SHOTS_DIR, 'desktop', `${route.slug}.png`),
        fullPage: true,
      });
    }

    // Laptop check (1366x768)
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    await checkHorizontalOverflow(page, 'laptop 1366x768 /');
    await page.screenshot({
      path: path.join(SHOTS_DIR, 'desktop', '00-home-1366x768.png'),
      fullPage: false,
    });
    await page.setViewportSize({ width: 1440, height: 900 });

    // Functional Tests on Desktop
    // A. CV PDF check
    const cvRes = await page.request.get(`${BASE_URL}/documents/Zara-Rafiq-CV.pdf`);
    if (cvRes.status() !== 200) {
      throw new Error(`CV PDF request failed: ${cvRes.status()}`);
    }
    const cvHeaders = cvRes.headers();
    if (!(cvHeaders['content-type'] || '').includes('pdf')) {
      throw new Error(`Unexpected CV content-type: ${cvHeaders['content-type']}`);
    }

    // B. Audio playback + route continuity
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const playBtn = page.getByRole('button', { name: 'Play background music' });
    await playBtn.click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Pause background music' }).waitFor({ state: 'visible' });

    // Navigate to About & Skills and verify audio stays active
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'About' }).click();
    await page.waitForURL('**/about');
    await page.getByRole('button', { name: 'Pause background music' }).waitFor({ state: 'visible' });

    // Open Header Audio settings popover and toggle mute
    await page.getByRole('button', { name: 'Audio settings and volume' }).click();
    await page.getByRole('region', { name: 'Background music controls' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Mute background music' }).click();
    await page.getByRole('button', { name: 'Unmute background music' }).click();
    await page.keyboard.press('Escape');

    // Browser Back & Forward
    await page.goBack();
    await page.waitForURL(`${BASE_URL}/`);
    await page.goForward();
    await page.waitForURL(`${BASE_URL}/about`);

    // Pause audio cleanly
    await page.getByRole('button', { name: 'Pause background music' }).click();
    await page.getByRole('button', { name: 'Play background music' }).waitFor({ state: 'visible' });

    // C. Home interactive Skills switcher
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /4\s*Canva Design/i }).click();
    await page.getByRole('heading', { name: 'Canva Design' }).waitFor({ state: 'visible' });

    // D. Portfolio filtering + case study next navigation
    await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle' });
    const initialCards = await page.locator('article').count();
    if (initialCards !== 2) throw new Error(`Expected 2 portfolio cards initially, got ${initialCards}`);

    await page.getByRole('button', { name: 'Canva Design' }).click();
    const canvaCards = await page.locator('article').count();
    if (canvaCards !== 1) throw new Error(`Expected 1 card under Canva Design filter, got ${canvaCards}`);

    await page.getByRole('button', { name: 'All Projects' }).click();
    await page.getByRole('link', { name: /View Project/i }).first().click();
    await page.waitForURL('**/portfolio/ebay-listing-practice');
    await page.getByRole('link', { name: /Next Project/i }).click();
    await page.waitForURL('**/portfolio/digital-marketing-canva');

    // E. Contact form validation + truthful mailto fallback
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Send Message' }).click();
    const errorCount = await page.getByRole('alert').count();
    if (errorCount < 4) throw new Error(`Expected 4 validation errors on empty submit, got ${errorCount}`);

    await page.fill('#fullName', 'Recruiter Example');
    await page.fill('#email', 'recruiter@example.com');
    await page.fill('#subject', 'Entry-Level E-commerce Assistant Role');
    await page.fill('#message', 'Hello Zara, we reviewed your practical eBay listing work and would like to connect.');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await page.getByText('Direct Email Delivery Ready').waitFor({ state: 'visible' });

    // F. Reduced motion check
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await checkHorizontalOverflow(page, 'desktop reduced-motion /');

    await desktopCtx.close();

    // 2. MOBILE & TABLET SUITE (390x844, 320x568, 768x1024)
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
    });
    const mPage = await mobileCtx.newPage();

    mPage.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[mobile console] ${msg.text()}`);
      }
    });
    mPage.on('pageerror', (err) => {
      consoleErrors.push(`[mobile pageerror] ${err.message}`);
    });

    for (const route of ROUTES) {
      await mPage.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await mPage.waitForTimeout(450);
      await scrollEntirePage(mPage);
      await checkHorizontalOverflow(mPage, `mobile 390px ${route.path}`);
      await checkLoadedImages(mPage, `mobile 390px ${route.path}`);

      if (route.slug === 'home') {
        await mPage.screenshot({
          path: path.join(SHOTS_DIR, 'mobile', '00-home-fold.png'),
          fullPage: false,
        });
      }
      await mPage.screenshot({
        path: path.join(SHOTS_DIR, 'mobile', `${route.slug}.png`),
        fullPage: true,
      });
    }

    // Mobile hamburger menu open, Escape close, navigation check
    await mPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await mPage.getByRole('button', { name: 'Open navigation menu' }).click();
    const drawer = mPage.getByRole('dialog', { name: 'Mobile navigation menu' });
    await drawer.waitFor({ state: 'visible' });
    await mPage.keyboard.press('Escape');
    await drawer.waitFor({ state: 'hidden' });

    // Navigate via drawer to Education
    await mPage.getByRole('button', { name: 'Open navigation menu' }).click();
    await drawer.getByRole('link', { name: 'Education' }).click();
    await mPage.waitForURL('**/education');

    // Narrowest mobile viewport (320px) & Tablet (768px) overflow checks
    for (const [w, h] of [
      [320, 568],
      [768, 1024],
    ]) {
      await mPage.setViewportSize({ width: w, height: h });
      for (const p of ['/', '/portfolio', '/contact']) {
        await mPage.goto(`${BASE_URL}${p}`, { waitUntil: 'networkidle' });
        await checkHorizontalOverflow(mPage, `${w}x${h} ${p}`);
      }
    }

    await mobileCtx.close();

    if (consoleErrors.length > 0) {
      throw new Error(`Console/page errors:\n${consoleErrors.join('\n')}`);
    }
    if (failedRequests.length > 0) {
      throw new Error(`Failed HTTP requests:\n${failedRequests.join('\n')}`);
    }

    console.log('ALL PLAYWRIGHT FUNCTIONAL, RESPONSIVE & SCREENSHOT CHECKS PASSED.');
  } finally {
    await browser.close();
    if (process.platform === 'win32' && server.pid) {
      spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      server.kill();
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
