// A predefined list of major road segments in Balikpapan for traffic monitoring.
// In a real-world scenario, this list would be more comprehensive and could be
// stored in the database or managed via an admin interface.

export type RoadSegment = {
  name: string;
  area: string;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
};

export const BALIKPAPAN_ROAD_SEGMENTS: RoadSegment[] = [
  {
    name: 'Jl. Jenderal Sudirman',
    area: 'Taman Bekapai to Pantai Melawai',
    start: { lat: -1.268, lng: 116.832 },
    end: { lat: -1.277, lng: 116.822 },
  },
  {
    name: 'Jl. Ahmad Yani',
    area: 'Plaza Balikpapan to Karang Jati',
    start: { lat: -1.264, lng: 116.831 },
    end: { lat: -1.255, lng: 116.842 },
  },
  {
    name: 'Jl. Soekarno-Hatta',
    area: 'KM 5 to KM 8',
    start: { lat: -1.224, lng: 116.862 },
    end: { lat: -1.201, lng: 116.878 },
  },
  {
    name: 'Jl. Marsma Iswahyudi',
    area: 'Sepinggan Airport Area',
    start: { lat: -1.274, lng: 116.892 },
    end: { lat: -1.265, lng: 116.882 },
  },
  {
    name: 'Jl. Mulawarman',
    area: 'Manggar Beach Area',
    start: { lat: -1.278, lng: 116.938 },
    end: { lat: -1.288, lng: 116.951 },
  },
];
