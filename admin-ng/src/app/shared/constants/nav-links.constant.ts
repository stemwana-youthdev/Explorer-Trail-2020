export interface Links {
  label: string;
  link: string;
  icon: string;
}

export const NavLinks: Links[] = [
  { label: 'Locations', link: 'locations', icon: 'location_on' },
  { label: 'Challenges', link: 'challenges', icon: 'terrain' }
];
