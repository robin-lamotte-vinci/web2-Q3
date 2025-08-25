import path from "node:path";
import { Comment, NewComment } from "../types";
import { parse, serialize } from "../utils/json";
import { readFilmById } from "./films";

const jsonDbPath = path.join(__dirname, "/../data/comments.json");

const defaultComments: Comment[] = [
  {
    id: 1,
    idFilm: 2,
    username: "alice",
    comment: "J'ai adoré ce film, très émouvant !"
  },
  {
    id: 2,
    idFilm: 2,
    username: "bob",
    comment: "Bon scénario, mais un peu trop long à mon goût."
  },
  {
    id: 3,
    idFilm: 3,
    username: "charlie",
    comment: "Les effets spéciaux sont incroyables !"
  },
  {
    id: 4,
    idFilm: 1,
    username: "admin",
    comment: "Un classique à voir absolument."
  }
];

function readComments(idFilm: number | undefined): Comment[] {
  const comments = parse(jsonDbPath, defaultComments);
  if (!idFilm) return comments;

  const fiteredComments: Comment[] = comments.filter((c) => c.idFilm === idFilm);

  return fiteredComments;
}


function createComment(newComment: NewComment): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  const film = readFilmById(newComment.idFilm);
  if (!film) return undefined;
  const nextId = comments.reduce((acc, comment) => (comment.id > acc ? comment.id : acc), 0) + 1;
  const comment: Comment = { ...newComment, id: nextId };
  const updatedComments = [...comments, comment];
  serialize(jsonDbPath, updatedComments);
  return comment;
}

export { readComments, createComment };