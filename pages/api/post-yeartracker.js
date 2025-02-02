// pages/api/post-yeartracker.js
import { TwitterApi } from 'twitter-api-v2';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting tweet process...');
    console.log('Checking Twitter credentials:', {
      hasApiKey: !!process.env.TWITTER_API_KEY,
      hasApiSecret: !!process.env.TWITTER_API_SECRET,
      hasAccessToken: !!process.env.TWITTER_ACCESS_TOKEN,
      hasAccessSecret: !!process.env.TWITTER_ACCESS_SECRET
    });

    // Launch browser to capture your existing yeartracker
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: {
        width: 1200,
        height: 630,
      },
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    console.log('Browser launched, creating new page...');
    const page = await browser.newPage();

    // Navigate to your existing yeartracker page
    console.log('Navigating to yeartracker...');
    await page.goto('https://sriramkj.com/yeartracker');

    // Wait for the year tracker to render
    console.log('Waiting for selector...');
    await page.waitForSelector('.text-lg');

    // Take screenshot
    console.log('Taking screenshot...');
    const screenshot = await page.screenshot({
      encoding: 'base64'
    });
    await browser.close();
    console.log('Browser closed successfully');

    // Calculate current progress
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const progress = ((dayOfYear / 365) * 100).toFixed(2);
    console.log('Calculated progress:', progress);

    // Upload media to Twitter
    console.log('Uploading media to Twitter...');
    const mediaId = await client.v1.uploadMedia(
      Buffer.from(screenshot, 'base64'),
      { type: 'png' }
    );
    console.log('Media uploaded successfully, mediaId:', mediaId);

    // Create tweet
    console.log('Creating tweet...');
    await client.v2.tweet({
      text: `\u{1F5D3} Year Progress Update: ${progress}% Complete\n\nTrack time at: https://sriramkj.com/yeartracker`,
      media: { media_ids: [mediaId] }
    });
    console.log('Tweet posted successfully');

    return res.status(200).json({ message: 'Tweet posted successfully' });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({ message: 'Error posting tweet', error: error.message });
  }
}