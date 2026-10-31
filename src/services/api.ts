import {
  CollectionItem,
  NewItem,
  TopSeller,
  ExploreItem,
  AuthorDetails,
  ItemDetails,
} from '../types';

const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net';

// Fallback data in case the external API is unreachable or rate limited
const fallbackCollections: CollectionItem[] = [
  {
    id: 1,
    title: 'Abstraction',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    nftId: 39924405,
    authorId: 83937449,
    code: 192,
  },
  {
    id: 2,
    title: 'Patternlicious',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=80',
    nftId: 44923101,
    authorId: 92837411,
    code: 144,
  },
  {
    id: 3,
    title: 'Skellies',
    authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&auto=format&fit=crop&q=80',
    nftId: 55912403,
    authorId: 71829304,
    code: 98,
  },
  {
    id: 4,
    title: 'Cartoonism',
    authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=80',
    nftId: 67123990,
    authorId: 66192847,
    code: 73,
  },
  {
    id: 5,
    title: 'Virtualland',
    authorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=500&auto=format&fit=crop&q=80',
    nftId: 78234190,
    authorId: 55192837,
    code: 220,
  },
  {
    id: 6,
    title: 'Paper Cut',
    authorImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=500&auto=format&fit=crop&q=80',
    nftId: 89123847,
    authorId: 44192837,
    code: 105,
  },
];

const fallbackNewItems: NewItem[] = [
  {
    id: 1,
    authorId: 83937449,
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    nftId: 39924405,
    title: 'Pinky Pleasure',
    price: 0.08,
    likes: 97,
    expiryDate: Date.now() + 1000 * 60 * 60 * 18 + 1000 * 60 * 24, // 18 hours from now
  },
  {
    id: 2,
    authorId: 92837411,
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=80',
    nftId: 44923101,
    title: 'Deep Sea Phantasy',
    price: 0.06,
    likes: 84,
    expiryDate: Date.now() + 1000 * 60 * 60 * 9 + 1000 * 60 * 45, // ~9 hours
  },
  {
    id: 3,
    authorId: 71829304,
    authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&auto=format&fit=crop&q=80',
    nftId: 55912403,
    title: 'Rainbow Style',
    price: 0.12,
    likes: 132,
    expiryDate: Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 12, // 2 hours
  },
  {
    id: 4,
    authorId: 66192847,
    authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=80',
    nftId: 67123990,
    title: 'Two Tigers',
    price: 0.05,
    likes: 56,
    expiryDate: Date.now() + 1000 * 60 * 60 * 36, // 36 hours
  },
  {
    id: 5,
    authorId: 55192837,
    authorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=500&auto=format&fit=crop&q=80',
    nftId: 78234190,
    title: 'The Truth',
    price: 0.14,
    likes: 91,
    expiryDate: Date.now() + 1000 * 60 * 60 * 14,
  },
  {
    id: 6,
    authorId: 44192837,
    authorImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=500&auto=format&fit=crop&q=80',
    nftId: 89123847,
    title: 'Running Puppets',
    price: 0.09,
    likes: 47,
    expiryDate: Date.now() + 1000 * 60 * 60 * 5,
  },
  {
    id: 7,
    authorId: 33192837,
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    nftImage: 'https://images.unsplash.com/photo-1637775297516-801577207197?w=500&auto=format&fit=crop&q=80',
    nftId: 99123847,
    title: 'USA Word Cup',
    price: 0.22,
    likes: 110,
    expiryDate: Date.now() + 1000 * 60 * 60 * 28,
  },
];

const fallbackTopSellers: TopSeller[] = [
  { id: 1, authorName: 'Monica Lucas', authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', authorId: 83937449, price: 3.2 },
  { id: 2, authorName: 'Lori Hart', authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', authorId: 92837411, price: 2.8 },
  { id: 3, authorName: 'Gayle Hicks', authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', authorId: 71829304, price: 2.5 },
  { id: 4, authorName: 'Stacy Long', authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', authorId: 66192847, price: 2.1 },
  { id: 5, authorName: 'Fred Ryan', authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', authorId: 55192837, price: 1.9 },
  { id: 6, authorName: 'Nicholas Daniels', authorImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', authorId: 44192837, price: 1.8 },
  { id: 7, authorName: 'Franklin Carlson', authorImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', authorId: 33192837, price: 1.6 },
  { id: 8, authorName: 'Mamie Barnett', authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', authorId: 22192837, price: 1.5 },
  { id: 9, authorName: 'Jimmy Wright', authorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', authorId: 11192837, price: 1.4 },
  { id: 10, authorName: 'Karla Sharp', authorImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', authorId: 99192837, price: 1.3 },
  { id: 11, authorName: 'Tyler Newman', authorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', authorId: 88192837, price: 1.1 },
  { id: 12, authorName: 'Ellis James', authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', authorId: 77192837, price: 0.9 },
];

export async function fetchHotCollections(): Promise<CollectionItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/hotCollections`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    return fallbackCollections;
  }
}

export async function fetchNewItems(): Promise<NewItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/newItems`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    return fallbackNewItems;
  }
}

export async function fetchTopSellers(): Promise<TopSeller[]> {
  try {
    const res = await fetch(`${BASE_URL}/topSellers`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    return fallbackTopSellers;
  }
}

export async function fetchExplore(filter?: string): Promise<ExploreItem[]> {
  try {
    const url = filter
      ? `${BASE_URL}/explore?filter=${filter}`
      : `${BASE_URL}/explore`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    let items = [...fallbackNewItems, ...fallbackNewItems.map((item, idx) => ({
      ...item,
      id: item.id + 10,
      nftId: item.nftId + 10,
      title: `${item.title} #${idx + 2}`,
      price: +(item.price * (1 + idx * 0.25)).toFixed(2),
      likes: item.likes + idx * 5,
    }))];

    if (filter === 'price_low_to_high') {
      items.sort((a, b) => a.price - b.price);
    } else if (filter === 'price_high_to_low') {
      items.sort((a, b) => b.price - a.price);
    } else if (filter === 'likes_high_to_low') {
      items.sort((a, b) => b.likes - a.likes);
    }

    return items;
  }
}

export async function fetchAuthor(authorId: number | string): Promise<AuthorDetails> {
  try {
    const res = await fetch(`${BASE_URL}/authors?author=${authorId}`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    return {
      id: 1,
      authorName: 'Monica Lucas',
      tag: 'monica_lucas',
      address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authorId: Number(authorId) || 83937449,
      followers: 573,
      nftCollection: [
        {
          id: 1,
          nftImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
          title: 'Pinky Pleasure',
          price: 0.08,
          likes: 97,
        },
        {
          id: 2,
          nftImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=80',
          title: 'Deep Sea Phantasy',
          price: 0.06,
          likes: 84,
        },
        {
          id: 3,
          nftImage: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=500&auto=format&fit=crop&q=80',
          title: 'Rainbow Style',
          price: 0.12,
          likes: 132,
        },
      ],
    };
  }
}

export async function fetchItemDetails(nftId: number | string): Promise<ItemDetails> {
  try {
    const res = await fetch(`${BASE_URL}/itemDetails?nftId=${nftId}`, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    return {
      id: 1,
      title: 'Pinky Pleasure',
      tag: 'art',
      description: 'Pinky Pleasure is a unique, high-resolution generative 3D visual sculpture representing emotional harmonics on Ethereum. Certified by Ultraverse.',
      nftImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      nftId: Number(nftId) || 39924405,
      ownerName: 'Monica Lucas',
      ownerId: 83937449,
      ownerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      creatorName: 'Monica Lucas',
      creatorId: 83937449,
      creatorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      price: 0.08,
      likes: 97,
      views: 342,
    };
  }
}
