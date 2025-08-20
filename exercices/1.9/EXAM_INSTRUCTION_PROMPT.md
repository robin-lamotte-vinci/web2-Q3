# Fichier d'instructions — prompt d'examen

Objectif
- Générer une petite API REST en respectant exactement la structure de projet et le style de codage de ce workspace :
  - `types.ts` pour les types TypeScript
  - `services/<resource>.ts` pour l'accès aux données (parse/serialize d'un fichier JSON)
  - `routes/<resource>.ts` pour les routes Express et la validation des requêtes
  - `utils/type-guards.ts` pour les gardes de type au runtime
  - `utils/validate.ts` pour les helpers de validation des clés
  - `utils/json.ts` pour les helpers `parse`/`serialize`

Règles générales / conventions
- Langage : TypeScript.
- Documentation : JSDoc concise en anglais au-dessus de chaque fonction exportée (une ou deux lignes + `@param`/`@returns` si pertinent).
- Séparer les couches : les routes gèrent parsing/validation des requêtes, les services manipulent les données et persistent.
- Utiliser `isNumber` (du fichier `utils/type-guards.ts`).
- Considérer `0` comme un filtre numérique valide ; considérer `undefined`/`null` comme « pas de filtre » et `NaN`/`Infinity` doit renvoyer le status code 400.
- Lors de la lecture d'un paramètre `req.query`, effectuer la conversion dans la route (`Number(raw)`) ; les fonctions de service acceptent des paramètres numériques ou optionnels.
- Utiliser des tableaux `expected keys` (`as const`) dans les routes/utils et valider les bodies avec les gardes `isNewX` et `containsOnlyExpectedKeys`.
- Lors du merge pour une mise à jour partielle, le service suppose que `Partial<NewType>` ne contient que des clés attendues (mentionner cette hypothèse dans le JSDoc) ; les routes doivent vérifier que le body ne contient que des clé attendues avant d'appeler le service (sinon renvoyer le code status 400).
- Utiliser `parse(jsonDbPath, defaultData)` et `serialize(jsonDbPath, data)` dans les services.

Format de sortie attendu de l'assistant
- Respecter la même structure de fichiers et les mêmes noms que dans les exemples ci-dessous.
- Inclure un JSDoc concis au-dessus des fonctions.
- Exporter les fonctions en bas des fichiers de service.

Exemple : templates exacts (adapter pour la ressource `films`)

```typescript
interface Film {
  id: number; 
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}
type NewFilm = Omit<Film, "id">;

export type { Film, NewFilm };
```

```typescript
// Returns true if object contains only keys from expectedKeys
const containsOnlyExpectedKeys = (obj: object, expectedKeys: readonly string[]): boolean => {
  return Object.keys(obj).every((k) => expectedKeys.includes(k));
};
export { containsOnlyExpectedKeys };
```

```typescript
import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    duration: 136,
    budget: 63,
    imageUrl: "https://example.com/matrix.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

/**
 * Return all films or films whose duration is greater than or equal to the provided minimum.
 * @param minimumDuration optional minimum duration in minutes; when undefined returns all films
 * @returns Array of Film matching the filter
 */
function readAllFilms(minimumDuration?: number): Film[] {
  const films = parse(jsonDbPath, defaultFilms);
  if (minimumDuration === undefined) {
    return films;
  }

  const filteredFilms = films.filter(
    (film) => film.duration >= minimumDuration
  );
  return filteredFilms;
}

/**
 * Find and return a film by its numeric id.
 * @param id film id to look up
 * @returns the Film if found, otherwise undefined
 */
function readOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id); //films.find(...) returns Film|undefined
}

/**
 * Create a new film, assign a new id, persist to storage and return the created film.
 *
 * Note: newFilm is expected to contain only valid NewFilm attributes. Extra or invalid
 * properties are not checked here and will be merged/persisted at runtime unless validated beforehand.
 *
 * @param newFilm data for the film to create (without id)
 * @returns the created Film with assigned id
 */
function createOneFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);

  const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
  const addedFilm: Film = { id: nextId, ...newFilm };
  films.push(addedFilm);
  serialize(jsonDbPath, films);

  return addedFilm;
}

/**
 * Delete a film by id, persist changes and return the deleted film.
 * @param id id of the film to delete
 * @returns the deleted Film if it existed, otherwise undefined
 */
function deleteOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) {
    return undefined;
  }

  const deletedFilm = films.splice(index, 1);
  serialize(jsonDbPath, films);

  return deletedFilm[0];
}

/**
 * Update a film by merging provided partial fields, persist changes and return the updated film.
 *
 * Note: partialNewFilm is expected to contain only valid NewFilm attributes. Extra or invalid
 * properties are not checked here and will be merged at runtime unless validated beforehand.
 *
 * @param id id of the film to update
 * @param partialNewFilm partial fields to apply to the existing film (only NewFilm keys expected)
 * @returns the updated Film if it existed, otherwise undefined
 */
function updateOneFilm(
  id: number,
  partialNewFilm: Partial<NewFilm>
): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((f) => f.id === id);
  if (index === -1) {
    return undefined;
  }

  const updatedFilm: Film = { ...films[index], ...partialNewFilm };

  films[index] = updatedFilm;
  serialize(jsonDbPath, films);

  return updatedFilm;
}

export {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};

```

```typescript
import { Router } from "express";
import { Film, NewFilm } from "../types";
import { isNewFilm } from "../utils/type-guards";
import { containsOnlyExpectedKeys } from "../utils/validate";
import {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} from "../services/films";

const router = Router();

const expectedKeys = [
  "title",
  "director",
  "duration",
  "budget",
  "description",
  "imageUrl",
];

router.get("/", (req, res) => {
  const allowedQueries = ["minimum-duration"];
  if (!containsOnlyExpectedKeys(req.query, allowedQueries)) {
    return res.sendStatus(400);
  }

  if (!req.query["minimum-duration"]) {
    const films = readAllFilms();
    return res.json(films);
  }

  const minimumDuration = Number(req.query["minimum-duration"]);
  if (Number.isNaN(minimumDuration) || minimumDuration <= 0) {
    return res.sendStatus(400);
  }

  const filteredFilms = readAllFilms(minimumDuration);

  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const film = readOneFilm(id);

  if (!film) {
    return res.sendStatus(404);
  }

  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }

  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const films = readAllFilms();

  const newFilm: NewFilm = body;

  const existingFilm = films.find(
    (film) =>
      film.title.toLowerCase() === newFilm.title.toLowerCase() &&
      film.director.toLowerCase() === newFilm.director.toLowerCase()
  );

  if (existingFilm) {
    return res.sendStatus(409);
  }

  const addedFilm = createOneFilm(newFilm);
  return res.json(addedFilm);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const deletedFilm = deleteOneFilm(id);
  if (!deletedFilm) {
    return res.sendStatus(404);
  }

  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const filmToUpdate = readOneFilm(id);
  if (!filmToUpdate) {
    return res.sendStatus(404);
  }

  const body: unknown = req.body;
  if (!body || typeof body !== "object") {
    return res.sendStatus(400);
  }
  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const candidate: Film = { ...filmToUpdate, ...body };
  if (!isNewFilm(candidate)) {
    return res.sendStatus(400);
  }

  const films = readAllFilms();
  const conflict = films.find(
    (f) =>
      f.id !== id &&
      f.title.toLowerCase() === candidate.title.toLowerCase() &&
      f.director.toLowerCase() === candidate.director.toLowerCase()
  );
  if (conflict) {
    return res.sendStatus(409);
  }

  const updatedFilm = updateOneFilm(id, body);
  return res.send(updatedFilm);
});

export default router;

```

Petites vérifications à retenir
- Service: doit contenir un tableau avec quelques valeurs d'exemples (`defaultX`) pour les cas ou l'api vient d'etre demarrée et que la methode `serialize` n'a encore jamais été appelée.
- Route : convertir un paramètre `req.query` via `raw = req.query["x"]`; si `raw === undefined` => pas de filtre ; sinon adapter le filtre selon le contexte donné.
- Utiliser `containsOnlyExpectedKeys(obj, expectedKeys)` avec `expectedKeys` fourni au début du fichier `routes/<ressource>`.
- Valider le body avec la garde `isNewX` avant de persister.
- Documenter dans le JSDoc quand une fonction *suppose* que l'appelant a validé/nettoyé les données (p. ex. services create/update).

Fin.
