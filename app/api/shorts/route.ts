import { NextResponse } from "next/server";

const CHANNEL_ID = "UCtC3VPyF3Rz4pSb4lTa9MCw";

export async function GET() {
  try {
    const rss = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );

    if (!rss.ok) throw new Error("RSS fetch failed");

    const xml = await rss.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 11);

    const shorts = entries.map((m) => {
      const block = m[1];
      const id = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] ?? "";
      const title = (block.match(/<title>([^<]+)<\/title>/) || [])[1] ?? "";
      return {
        id,
        title: title.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/shorts/${id}`,
      };
    });

    return NextResponse.json(shorts);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
