# Patbershop · Dossier de design (skill 10k websites, niveau 1 allégé)

Le héros reste tel quel (séquence d'images au défilement, choix de l'utilisateur). Ce dossier couvre la page sous le héros.

## 1. L'idée de la marque

Un seul mot : **la jasette**. Elle vient de la devise du shop, « Coupe, barbe & jasette ». La plus grande peur des clients de barbier est un barbier qui n'écoute pas, avec un dégradé trop haut ou une coupe différente de la demande. Chez Pat, on jase d'abord, on coupe ensuite, et tu sors comme tu l'avais demandé. Toute la page mène à un seul bouton : Réserver sur Booksy.

## 2. Palette (celle du héros, gardée exprès)

Écart dit à voix haute : charbon et ambre est un look par défaut que le skill évite d'habitude. Ici, c'est le vrai monde du shop (cuir cognac, ampoules Edison) et il doit rester assorti au héros, qui ne change pas.

```css
--canvas:#16171a;      /* charbon, jamais du noir pur */
--panel:#22252a;       /* ardoise */
--accent:#b5602a;      /* cognac : boutons, appel à l'action */
--accent-hover:#8f4a1f;
--accent-muted:#f0b062;/* ambre d'ampoule, en petites doses */
--text-secondary:#b9bec4;
--text-primary:#ece4d3;/* crème */
```

## 3. Polices

Big Shoulders Display 700/800/900 (titres) · Instrument Sans 400/500/600 (texte) · IBM Plex Mono 500 (petites étiquettes) · Rye 400 (enseigne, avec retenue).

## 4. Carte des bandes

Aucune nouvelle bande : le héros garde ses quatre moments actuels.

## 5. Héros statique

Celui qui existe déjà (affiche de la première image, mouvement réduit), sans changement.

## 6. Sections sous le héros, dans l'ordre (texte final)

1. **#le-shop · La jasette**
   - Étiquette : « Coupe, barbe & jasette »
   - Titre : « Tu parles. » / « On écoute. » / « Tu sors sharp. »
   - Paragraphe : « Ta coupe commence par une jasette. Tu montres une photo, tu dis ce que tu veux et ce que tu ne veux pas. Ensuite seulement, la tondeuse part. »
   - Notes sur le miroir (vrais avis Booksy) : « Très professionnel et minutieux. » Stephanie · « Toujours agréable et le service est impeccable. » Simon · « Top notch comme d'habitude! » Dominic
   - Devise : « Enfin un vrai barber shop… sauf que maintenant on appelle ça un PatBershop. » (page Facebook du shop)
2. **#carte · La carte** : inchangée.
3. **Bande poteau** (signature) : « Fade · Barbe · Jasette · 7, rue du Marché · Sharp à l'os »
4. **#numero · Prends un numéro** (le moment interactif)
   - Étiquette : « Ta coupe en 3 questions »
   - Titre : « Prends » / « un » / « numéro. »
   - Paragraphe : « Réponds à trois questions, puis tiens le bouton du distributeur. Ton billet sort avec le service et le barbier qui te conviennent. »
   - Bouton : « Tiens pour imprimer »
   - Aide : « Tiens le bouton enfoncé. Le billet sort pendant que tu tiens. » / Fini : « Imprimé. Change une réponse pour un autre billet. »
5. **#etapes · Comment ça se passe**
   - Titre : « Trois temps, une chaise. »
   - Paragraphe : « Pas de surprise dans le miroir. Voici comment se passe une visite chez Pat. »
   - 1 On jase : « Tu montres une photo ou tu décris ta coupe. Ton barbier te dit ce qui marche avec tes cheveux, et jusqu'où monte le dégradé. »
   - 2 On coupe : « Tondeuse, ciseaux, rasoir. On prend le temps de bien fondre le dégradé, sans ligne dure. »
   - 3 Tu repars sharp : « Coiffé, la barbe nette. Une coupe faite pour rester belle les semaines d'après. »
6. **#equipe** et **#avis** : inchangées, avec des entrées animées.
7. **#questions · Les vraies questions**
   - Titre : « Avant de » / « t'asseoir, » / « on répond. »
   - J'ai peur que mon dégradé monte trop haut. / Faut-il réserver? / Je peux choisir mon barbier? / Vous coupez les cheveux des femmes? / Et les enfants? / Stationnement, paiement, Wi-Fi?
8. **#rendez-vous · Appel final**, sur la dernière image du héros
   - « Ta chaise » / « t'attend. »
   - « Pat et son équipe, au 7, rue du Marché. Réserve en ligne, 24 heures sur 24. »
   - Boutons : « Réserver sur Booksy » · « Prends un numéro d'abord »
9. **#visite** et le pied de page : inchangés.

Formulaire : aucun. L'appel à l'action mène directement à Booksy, où se prennent les rendez-vous.

## 7. Couche vectorielle

Rayures du poteau qui tournent avec le défilement (bande et coutures) ; fil ambre qui se dessine entre les 3 étapes ; ruban adhésif sur les notes ; poussières d'ampoule dans l'appel final ; lueur ambre fixe qui dérive en fond (72 s) après le héros. Tout est figé dans son état final quand le mouvement est réduit.

## 8. Ingénierie

Écritures dans le DOM seulement quand une valeur change ; tout en transform et opacity ; boucles qui se mettent en pause hors écran et quand l'onglet est caché ; mouvement réduit respecté en direct, dans les deux sens ; débordement horizontal bloqué ; aucun changement au code du héros.

## 9. Contrôle du texte

Chaque ligne ci-dessus est publiée mot pour mot. Avant que quiconque voie la page : zéro tiret long, zéro mot générique, et une relecture contre les tics d'IA.
