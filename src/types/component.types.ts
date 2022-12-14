export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserModel: Symbol.for('UserModel'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  FilmModel: Symbol.for('FilmModel'),
  FilmServiceInterface: Symbol.for('FilmServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  FavoriteModel: Symbol.for('FavoriteModel'),
  FavoriteServiceInterface: Symbol.for('FavoriteServiceInterface'),
  FavoriteController: Symbol.for('FavoriteController'),
  UserController: Symbol.for('UserController'),
  FilmController: Symbol.for('FilmController'),
  CommentController: Symbol.for('CommentController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
