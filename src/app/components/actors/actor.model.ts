export interface actorCreationDto {
  name: string;
  dateOfBirth: Date;
  picture: File;
  biography: string;
}

export interface actorDto {
  id: number;
  name: string;
  dateOfBirth: Date;
  picture: string;
  biography: string;
}

export interface movieActorDto {
  id: number;
  name: string;
  picture: string;
  character: string;
}
