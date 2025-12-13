import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { getMetadata } from '@/lib/metadata';

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    // If not authenticated, redirect to sign-in page (or home page)
    return NextResponse.redirect(new URL('/', req.url));
  }

  const { searchParams } = new URL(req.url);
  const titleParam = searchParams.get('title') || '';
  const textParam = searchParams.get('text') || '';
  const urlParam = searchParams.get('url');

  if (!urlParam) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect home if no URL
  }

  try {
    // Check if the item already exists for the user
    const existingItem = await db
      .select()
      .from(items)
      .where(eq(items.url, urlParam))
      .limit(1);

    if (existingItem.length > 0) {
      // Already exists, just redirect to inbox
      return NextResponse.redirect(new URL('/inbox', req.url));
    }

    // Get metadata
    const metadata = await getMetadata(urlParam);

    // Insert into DB
    await db.insert(items).values({
      id: uuidv4(),
      userId: userId,
      url: urlParam,
      title: titleParam || metadata.title, // Prefer share title, fallback to metadata
      description: textParam || metadata.description, // Prefer share text, fallback to metadata
      image: metadata.image,
      siteName: metadata.siteName,
      favicon: metadata.favicon,
      type: metadata.type || 'other',
      author: metadata.author,
      status: 'inbox',
    });

    // Redirect to the inbox page after successful save
    return NextResponse.redirect(new URL('/inbox', req.url));

  } catch (error) {
    console.error('Error in share target handler:', error);
    return NextResponse.redirect(new URL('/', req.url)); // Redirect home on error
  }
}
