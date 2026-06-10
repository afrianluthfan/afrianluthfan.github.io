import puppeteer from "puppeteer-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:8741/";
const SECTIONS = [
  "summary",
  "experience",
  "education",
  "certifications",
  "projects",
  "leadership",
  "contact",
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars"],
});

async function capture(prefix, { width, height, reducedMotion }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  if (reducedMotion) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: `/tmp/pf-shots/${prefix}-hero.png` });

  for (const id of SECTIONS) {
    await page.evaluate((sectionId) => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `/tmp/pf-shots/${prefix}-${id}.png` });
  }

  // extra: mid-pan frame of the pinned projects section (motion only)
  if (!reducedMotion) {
    await page.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) window.scrollTo(0, el.offsetTop + window.innerHeight * 1.4);
    });
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `/tmp/pf-shots/${prefix}-projects-mid.png` });
  }
  await page.close();
}

await capture("rm", { width: 1440, height: 900, reducedMotion: true });
await capture("mo", { width: 1440, height: 900, reducedMotion: false });
await capture("mob", { width: 390, height: 844, reducedMotion: true });

await browser.close();
console.log("done");
