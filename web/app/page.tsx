import { redirect } from 'next/navigation'

// Threads 風格：一進入就顯示社群動態，不顯示首頁
export default function Home() {
  redirect('/forum')
}
