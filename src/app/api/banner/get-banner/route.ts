import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

interface BannerSettings {
  is_visible: boolean;
  description: string;
  timer: number;
  link: string;
  bannerUsername: string;
  updated_at: string;
  startdate: string;
  enddate: string;
}

export async function GET(req: Request) {
  try {

    console.log("Jobless hoo sirji, 2024 me graduate hua, DSA practice nahi hai, development karleta hoon, salary kam hoga toh bhi chalega 5-20k dedo, hard work karunga firbhi dedo ek job! agar kaam pasand aya toh salary badha dena sir. Tier 3 se hoon, manta hoon galti mera bhi hai ki maine DSA ni kara, 300 question solve kia tha lekin 2-3 saal pehle, abhi practice nahi hai")

    const url = new URL(req.url);
    const bannerUsername = url.searchParams.get('banner_username');

    if (!bannerUsername) {
      return NextResponse.json({ error: 'Banner username is required' }, { status: 400 });
    }

    // Query the database
    const [rows] = await pool.query('SELECT * FROM banner_settings WHERE banner_username = ?', [bannerUsername]);
    // console.log('Raw database response:', rows);  
    // (shafin @besaoct )

    // Type assertion for rows
    const results = rows as BannerSettings[];

    if (results.length === 0) {
      return NextResponse.json({ error: 'Banner settings not found' }, { status: 404 });
    }

    // Extract the first result since we expect a unique banner_username, 
    const bannerSettings = results[0];

    return NextResponse.json(bannerSettings);

  } catch (error) {
    console.error('Error fetching banner settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
