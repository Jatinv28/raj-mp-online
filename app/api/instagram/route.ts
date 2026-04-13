import { NextResponse } from 'next/server';
import https from 'https';

// Simple in-memory cache to prevent Instagram rate limiting
let cachedData: any = null;
let lastFetchTime = 0;

export async function GET() {
  try {
    const now = Date.now();
    
    // Cache for 60 seconds to firmly prevent getting IP banned by Meta's aggressive rate limiting
    if (cachedData && (now - lastFetchTime) < 60000) {
      return NextResponse.json(cachedData);
    }

    const username = 'raj_mp.online';
    
    const data: string = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'www.instagram.com',
        path: `/api/v1/users/web_profile_info/?username=${username}`,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'x-ig-app-id': '936619743392459',
          'Accept': '*/*, application/json'
        }
      };

      const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => responseBody += chunk);
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Instagram API returned status: ${res.statusCode}`));
            return;
          }
          resolve(responseBody);
        });
      });

      req.on('error', (e) => reject(e));
      req.end();
    });

    const parsedData = JSON.parse(data);
    const user = parsedData?.data?.user;
    
    if (!user) {
      throw new Error('User data not found in response');
    }

    // Map the most recent 9 posts
    const mediaEdges = user.edge_owner_to_timeline_media?.edges || [];
    const recentPosts = mediaEdges.slice(0, 9).map((edge: any) => {
      const node = edge.node;
      return {
        id: node.id,
        type: node.is_video ? "reel" : "image",
        image: node.display_url,
        likes: node.edge_media_preview_like?.count || 0,
        comments: node.edge_media_to_comment?.count || 0,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
        linkedProductId: null // Preserving dynamic shop link signature
      };
    });

    cachedData = {
      followers: user.edge_followed_by?.count || 0,
      following: user.edge_follow?.count || 0,
      posts: user.edge_owner_to_timeline_media?.count || 0,
      recentPosts: recentPosts,
      username: username,
      status: "live",
      error: null
    };
    lastFetchTime = now;

    return NextResponse.json(cachedData);
  } catch (error) {
    console.error("Error fetching live Instagram data:", error);
    
    // Fallback securely to last known cache if Instagram blocks us momentarily
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    return NextResponse.json({
      followers: 256420,
      following: 892,
      posts: 1205,
      recentPosts: [], // Empty array fallback
      username: "raj_mp.online",
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
