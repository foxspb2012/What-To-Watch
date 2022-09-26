export default class CreateCommentDto {
  public text!: string;
  public rating!: number;
  public postDate!: Date;
  public author!: string;
  public filmId!: string;
}
