export interface Comment {
  id: string
  author: { name: string; avatar: string }
  text: string
  createdAt: string
}

export interface Post {
  id: string
  author: { name: string; avatar: string }
  content: string
  location: string
  images: string[]
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  liked?: boolean
}

export const demoCommentsByPostId: Record<string, Comment[]> = {
  '1': [
    { id: 'c1-1', author: { name: 'Amy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amy' }, text: '上次去過，狗狗真的超愛！', createdAt: '1 小時前' },
    { id: 'c1-2', author: { name: 'Ben', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben' }, text: '謝謝分享，週末去看看', createdAt: '30 分鐘前' },
  ],
  '2': [
    { id: 'c2-1', author: { name: 'Chris', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' }, text: '維園寵物區真的不錯 👍', createdAt: '3 小時前' },
  ],
  '3': [],
  '4': [
    { id: 'c4-1', author: { name: 'Daisy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy' }, text: '銅鑼灣有一家「毛孩美容」不錯，可以試試', createdAt: '1 天前' },
  ],
  'demo-1': [
    { id: 'cd1-1', author: { name: 'Amy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amy' }, text: '西貢真係好正，我哋都成日去！', createdAt: '2 天前' },
  ],
  'demo-2': [],
  'demo-3': [
    { id: 'cd3-1', author: { name: 'Ben', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben' }, text: '我隻柴犬都住附近，可以約！', createdAt: '6 天前' },
  ],
}

export const demoPosts: Post[] = [
  {
    id: '1',
    author: { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    content: '推薦一個超棒的寵物友善咖啡廳！📍 位於中環的 "Paws & Coffee"，環境寬敞，還有專門的寵物區域。我的狗狗 Buddy 超愛這裡！',
    location: '中環, 香港',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600'],
    tags: ['寵物友善', '咖啡廳', '推薦'],
    likes: 42,
    comments: 8,
    createdAt: '2 小時前',
    liked: false,
  },
  {
    id: '2',
    author: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    content: '分享一個超棒的遛狗地點！🐕 維多利亞公園的寵物區，空間很大，而且有圍欄，很安全。週末帶 Luna 去，她玩得很開心！',
    location: '維多利亞公園, 銅鑼灣',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600'],
    tags: ['遛狗地點', '公園', '推薦'],
    likes: 35,
    comments: 5,
    createdAt: '5 小時前',
    liked: false,
  },
  {
    id: '3',
    author: { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    content: '剛發現一家新的寵物用品店，商品種類很齊全，價格也很合理。老闆人很好，還會給建議。推薦給大家！🛍️',
    location: '旺角, 香港',
    images: [],
    tags: ['寵物用品', '購物', '推薦'],
    likes: 28,
    comments: 12,
    createdAt: '1 天前',
    liked: false,
  },
  {
    id: '4',
    author: { name: 'Sarah Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    content: '有沒有人知道哪裡有好的寵物美容店？我的 Coco 需要修剪毛髮了。希望找一家技術好、價格合理的。謝謝！✨',
    location: '',
    images: [],
    tags: ['寵物美容', '詢問'],
    likes: 15,
    comments: 20,
    createdAt: '2 天前',
    liked: false,
  },
  // Demo user 小明 陳 的貼文
  {
    id: 'demo-1',
    author: { name: '小明 陳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user' },
    content: '上週帶阿黃去西貢海灘，佢玩到唔願走！🐕 海邊有段路可以放繩，大家有冇其他狗友善沙灘推薦？',
    location: '西貢, 香港',
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600'],
    tags: ['遛狗地點', '海灘', '推薦'],
    likes: 12,
    comments: 3,
    createdAt: '3 天前',
    liked: false,
  },
  {
    id: 'demo-2',
    author: { name: '小明 陳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user' },
    content: '屋企附近新開咗間寵物 cafe，貓狗都可以入，環境幾乾淨，值得一試～',
    location: '觀塘, 香港',
    images: [],
    tags: ['寵物友善', '咖啡廳'],
    likes: 8,
    comments: 2,
    createdAt: '5 天前',
    liked: false,
  },
  {
    id: 'demo-3',
    author: { name: '小明 陳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user' },
    content: '想幫阿黃搵玩伴！佢係黃金獵犬，3 歲，性格友善。住中環附近，週末可以約出嚟跑下。',
    location: '中環, 香港',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=600'],
    tags: ['搵玩伴', '狗狗'],
    likes: 24,
    comments: 7,
    createdAt: '1 週前',
    liked: false,
  },
]

export function getPost(id: string): Post | undefined {
  return demoPosts.find((p) => p.id === id)
}

export function getComments(postId: string): Comment[] {
  return demoCommentsByPostId[postId] ?? []
}
