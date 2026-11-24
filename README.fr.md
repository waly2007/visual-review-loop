# visual-review-loop

**Claude te dit que ton carrousel est fini. Il ne l'a jamais regardé.**

Un skill gratuit pour [Claude Code](https://claude.com/claude-code) qui oblige Claude à regarder son propre travail visuel avant de te le montrer : carrousels, posts, miniatures, présentations, captures d'app, maquettes, vidéos.

Le code a des tests. Les images et les vidéos n'ont rien : c'est **toi** qui fais la vérification. « L'image 1 n'est pas la bonne », « le titre est coupé », « le téléphone est coupé », « la version TikTok est cassée »… Chaque remarque, c'est un aller-retour. Ce skill est la boucle qui les attrape avant toi.

[Read in English](README.md)

## Ce qu'il fait

1. **Il écrit une liste de contrôle avant de fabriquer** : ta demande ligne par ligne, les règles de ton projet (`.claude/visual-checklist.md`) et des contrôles généraux (la bonne image au bon endroit, aucun texte coupé, rien de privé à l'écran, tous les formats).
2. **Il fabrique le vrai rendu** : taille finale, tous les formats (par ex. 1080×1350 et 1080×1920).
3. **Il le regarde** : une planche avec toutes les images ou des moments de la vidéo, puis les images à risque en grand.
4. **Il coche chaque point** : réussi, raté, ou impossible à vérifier. « Ça a l'air bien » n'est pas un résultat.
5. **Il corrige et recommence**, trois tours au plus.
6. **Il dit la vérité** : ce qu'il a vérifié, ce qu'il a corrigé, ce qu'il n'a pas pu vérifier.

## Premier essai réel

Sur un carrousel Instagram + TikTok de 9 images (18 fichiers) pour une application de voyage :

- **Tour 1 :** 4 erreurs trouvées avant que la personne ne voie quoi que ce soit : un chiffre important caché, une rangée coupée, des loupes qui cachaient le téléphone, un titre mal coupé en format vertical.
- **Tour 2 :** 1 erreur : les loupes montraient encore la mauvaise zone (positions mesurées sur une image réduite). Cette leçon est maintenant dans le skill.
- **Tour 3 :** tout est bon, dans les deux formats.

## Installation

```bash
git clone https://github.com/waly2007/visual-review-loop
cp -R visual-review-loop/skills/visual-review-loop ~/.claude/skills/
```

Claude Code l'utilise tout seul dès que tu demandes quelque chose de visuel, ou avec `/visual-review-loop`.

Tu peux ajouter un fichier `.claude/visual-checklist.md` dans ton projet avec tes règles de marque, une par ligne.

## Licence

MIT
