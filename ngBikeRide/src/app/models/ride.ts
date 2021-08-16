export class Ride {
  id: number;
  trailName: string;
  trailLength: string;
  bike: string;
  difficulty: string;
  trailType: string;

  constructor(
    id: number = 0,
    trailName: string = '',
    trailLength: string = '',
    bike: string = '',
    difficulty: string = '',
    trailType: string = ''
  ) {
    this.id = id;
    this.trailName = trailName;
    this.trailLength = trailLength;
    this.bike = bike;
    this.difficulty = difficulty;
    this.trailType = trailType;
  }
}
