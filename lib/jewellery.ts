export type JewelleryCategory = {
  id: string;
  label: string;
  descriptor: string;
  image: string;
  imagePosition: string;
};

// Replace labels and imagery here when PKV-approved category references are available.
export const jewelleryCategories: JewelleryCategory[] = [
  { id: 'bangles', label: 'Bangles', descriptor: 'Gold worn in a circle', image: '/images/gold-bangle.png', imagePosition: '50% center' },
  { id: 'chains', label: 'Chains', descriptor: 'Gold made to move', image: '/images/gold-chain.png', imagePosition: '50% center' },
  { id: 'rings', label: 'Rings', descriptor: 'A smaller measure of gold', image: '/images/gold-ring.png', imagePosition: '50% center' },
  { id: 'earrings', label: 'Earrings', descriptor: 'Gold with a quiet presence', image: '/images/gold-earrings.png', imagePosition: '50% center' },
  { id: 'coins', label: 'Gold Coins', descriptor: 'Gold held with meaning', image: '/images/gold-assessment-daylight.png', imagePosition: 'center' },
  { id: 'heirloom', label: 'Heirloom Pieces', descriptor: 'Gold with a history', image: '/images/hero-editorial.png', imagePosition: 'center' },
]; 
