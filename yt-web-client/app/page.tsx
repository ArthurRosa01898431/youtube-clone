import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import { getVideos } from './firebase/functions'

export default async function Home() {
  const videos = await getVideos();
  // This is a server side compenent so the logs are  found in the server console, not the clients.
  console.log(videos); 

  return (
    <main>
      {
        videos.map((video) => (
          <Link href={`/watch?v=${video.filename}`} key={video.id}> {/*Render multiple components, so need to add unique key */}
            <Image src={'/thumbnail.png'} alt='video' width={120} height={80}
              className={styles.thumbnail}/>
          </Link>
        ))
      }
    </main>
  )
}

export const revalidate = 30; // Every 30 seconds it will rerender page and cache.
