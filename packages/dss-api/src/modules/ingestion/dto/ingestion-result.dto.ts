export class IngestionResultDto {
  filesProcessed!: number;
  chunksCreated!: number;
  errors?: string[];
}
