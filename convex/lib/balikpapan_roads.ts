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
    start: { lat: -1.2664, lng: 116.8328 },
    end: { lat: -1.2784, lng: 116.8214 },
  },
  {
    name: 'Jl. Ahmad Yani',
    area: 'Plaza Balikpapan to Karang Jati',
    start: { lat: -1.264, lng: 116.8315 },
    end: { lat: -1.2555, lng: 116.8415 },
  },
  {
    name: 'Jl. Soekarno-Hatta',
    area: 'KM 5 to KM 8',
    start: { lat: -1.2245, lng: 116.8623 },
    end: { lat: -1.2012, lng: 116.8781 },
  },
  {
    name: 'Jl. Marsma Iswahyudi',
    area: 'Sepinggan Airport Area',
    start: { lat: -1.2742, lng: 116.8915 },
    end: { lat: -1.2653, lng: 116.8822 },
  },
  {
    name: 'Jl. Mulawarman',
    area: 'Manggar Beach Area',
    start: { lat: -1.2785, lng: 116.9383 },
    end: { lat: -1.288, lng: 116.9511 },
  },
];
