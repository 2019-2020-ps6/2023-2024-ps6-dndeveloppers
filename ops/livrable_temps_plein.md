# Projet2-PS6

## Sommaire
• [Persona et scénarios](#persona-et-scénarios)<br/>
• [Évaluation coopérative](#évaluation-coopérative)<br/>
• [TESTS](#tests)<br/>
• [Ops](#ops)<br/>

## Persona et scénarios

### Types de persona et types de scénarios

>Les différents utilisateurs de notre site sont : <br/>
• Les patients, des personnes âgées atteintes de la maladie d'Alzheimer. <br/>
• Le personnel soignant, qui encadre les patients.

>Les différents scénarios significatifs dépendent des différentes fonctionnalités accessibles par les utilisateurs de notre site. <br/>
• Les patients peuvent jouer à des quiz, et ont accès à différentes fonctionnalités juste avant et pendant qu'ils jouent. <br/>
• Les soignants peuvent jouer à des quiz, s'occuper de la gestion des quiz et des profils et consulter les statistiques.

### Nos persona et scénarios

>***Joseph Delmas***<br/><br/>
Joseph un ancien mécanicien de 70 ans qui souffre du stade 4 de la maladie ce qui se traduit par des pertes de mémoire et une grande anxiété. Il souhaite ralentir la progression d’Alzheimer et être rassuré.

```
Dans son scénario d’usage, la psychologue lui donne un quiz sur les politiciens en Guerre froide.
Joseph n’a aucun mal à répondre aux trois premières questions. Cependant, à la quatrième question, il doute. Ainsi, il appuie sur le bouton 'indice' qui lui retire l'un des choix. Toujours indécis, il rappuie sur ce bouton qui va lui retirer un deuxième choix. Avec seulement deux propositions de réponses, il parvient à trouver la bonne réponse. A la dernière question, il confond 'Richard Nixon' et 'Bill Clinton'. Après avoir appuyé sur 'Bill Clinton', il remarque que ce choix a disparu. Comprenant que ce n'était pas la bonne réponse, il clique à présent sur 'Richard Nixon' et parvient à terminer le quiz.
Le site le félicite est lui indique plusieurs prouesses qu'il a réalisé, à savoir : 
• Vous avez répondu à 5 questions lors de ce quiz
• Vouz avez eu 4 bonnes réponses.
• Vous avez répondu correctement 4 fois de suite
• Bravo : Vous n'avez utilisé que 2 indices
Il est donc à présent rassuré, et heureux des exploits qu'il a accompli.
```

>***Huguette Dupont***<br/><br/>
Huguette est une veuve de 67 ans qui souffre d’un Alzheimer de stade 4 accompagné de dépression. Elle souhaite elle aussi freiner la maladie et être rassurée quant à son état mais elle attend également que son expérience sur le site soit simple et claire.

```
Dans son scénario, elle fait des quiz pour garder son cerveau en forme. Elle décide de faire le quiz des calculs mentaux car elle rencontre quelques difficultés en ce moment avec les calculs.
Après avoir réussi avec succès les trois premières questions, une soignante l'interpelle pour lui poser une question. Elle décide donc de quitter le quiz avant de partir. Après son retour, elle souhaite continuer sa tentative, et relance donc le quiz sur les calculs mentaux. Un message apparait et lui propose de reprendre sa dernière tentative, ce qu'elle accepte avec joie.
Elle continue donc son quiz sans difficultés et réussit donc son quiz sans la moindre faute.
```

>***Maurice Bois***<br/><br/>
Un retraité de 83 ans passionné de nature qui est atteint du stade 6 d'Alzheimer qui s’accompagne d’hallucinations. Il attend de son expérience qu’elle l'aide à faire travailler sa mémoire tout en limitant le déclenchement de ses hallucinations.

```
Dans son scénario, il va faire un quiz sur les fleurs pour voir son évolution. Étant atteint d’hallucinations, le quiz de Maurice ne contiendra aucune image afin de ne pas le brusquer.
Maurice n’a aucune difficulté à répondre à la première question, mais la deuxième lui pose problème. Ne souhaitant pas rester bloqué, il décide de passer la question. A la troisième question, il demande un indice, et grâce à celui-ci, il trouve la bonne réponse. A la quatrième question "Qu'offre-t-on le 1er mai ?", il répond "tournesol". Cependant, c'est la réponse "muguet" et non pas "tournesol" qui s'allume en vert. La cinquième question se lance, question à laquelle Maurice répond correctement. Après cela, la question "Qu'offre-t-on le 1er mai ?" réapparait de nouveau sans l'option de réponse "tournesol". Maurice se souvient que la bonne réponse était "muguet", c'est donc ce qu'il choisit et réussit la question.
Le site le félicite d'avoir eu 4 bonnes réponses sur 5 et de n'avoir utilisé qu'un seul indice.
```

>***Mathilde Roques***<br/><br/>
Jeune psychiatre de 25 ans, elle souhaite pouvoir aider ses patients tout en suivant l’évolution de leur maladie grâce à des statistiques claires et complètes.

```
Dans son premier scénario, Mathilde crée le profil d’un nouveau patient. Pour cela elle rempli le nom, le prénom, la date de naissance et la photo du nouveau patient.
Il s’appelle Dorian Guigon et est né le 20 Avril 1956. En ce qui concerne les options, m. Guigon étant atteint d’hallucinations à cause de sa maladie d’Alzheimer, elle décide de laisser décoché la case concernant la présence des photos dans les quiz. De plus, ayant des problèmes avec sa mémoire immédiate, Mathilde décide de cocher l’option permettant de reposer les questions mal répondues plus tard. Au moment de valider la création du profil, Mathilde se rend compte que le bouton de validation n’est pas cliquable. Pour cause, un élément obligatoire n’a pas été renseigné : le status de ce nouveau profil. Elle renseigne donc que m. Guigon est un patient et non pas un membre du personnel et Mathilde peut donc valider ce nouveau profil.
```
```
Dans son deuxième scénario, Mathilde va créer un nouveau quiz. Elle va donc dans l’application pour créer un quiz. Elle nomme ce nouveau quiz Animaux et lui attribue le thème de la nature. Elle va y ajouter une première question sans indices :
• “Qui est le meilleur ami de l’Homme ?”
Et ses réponses, où elle sélectionne la première comme juste :
- Chien/Crocodile/Girafe/Belette
Puis elle ajoute une deuxième question sans indices :
• “Qui est le roi de la savane ?”
Et ses réponses, où elle sélectionne la deuxième comme juste :
- Lémurien/Lion/Tigre/Capybara
En moins de 10 minutes elle aura pu créer un quiz pour ses patients et ne sera plus jamais embêtée à l’idée de concevoir une activité pour un résident au vu de la simplicité de la tâche.
```
```
Dans son troisième scénario, Mathilde va consulter le profil de son nouveau patient : Dorian Guigon et voit que son plus mauvais résultat concerne le quiz des acteurs. Elle clique sur le bouton pour voir les statistiques et se rend compte que les statistiques du quiz sont très basses pour la deuxième question. Elle se rend dans la gestion des quiz et va regarder comment est composée la question qui fait défaut. La question est la suivante :
• “Qui incarne le personnage principal de Pirates des Caraïbes ?”
Et les réponses sont :
Julia Roberts/Johnny Depp/Florence Foresti/Omar Sy avec  la deuxième réponse sélectionnée comme la bonne. Cependant en regardant les indices proposés, elle se rend compte que le deuxième est “Ce personnage est une femme”, ce qui est faux. Cela a sûrement induit les patients en erreur. Elle modifie donc cet indice pour “Ce personnage est un homme” et confirme ses modifications.
Elle va ensuite effectuer le quiz avec son profil afin de vérifier que les modifications ont bien été effectuées, ce qu'elle constate sans surprise.
```

## Évaluation coopérative

>Le principe de l’évaluation coopérative consiste à faire tester notre site par des utilisateurs afin d'avoir des avis extérieurs sur la qualité du produit pour déterminer les principales difficultés rencontrées lors de l’utilisation. Ce test se fait en interprétant les persona et leurs scénarios décris ci-dessus pour répliquer les situations prévues. 
Nos craintes principales concernaient surtout l’interface du site et sa simplicité d'utilisation.

<u>**Accueil de jour**</u>

```
Elles ont décidé de tester le site par elles-mêmes sans suivre les scénarios. Cela leur a permit d'aller voir par elle-même les points qu'elles jugeaient les plus importants pour notre site, ainsi que de faire un test plus sincère car elles ont découvert le site par elles-mêmes sans une aide extérieure qui les dirige.
```
[Vidéo Accueil de jour](https://youtu.be/uUL3Yy8Rzn0)

<u>**L'équipe Compagnon-mémoire**</u>

```
Cette équipe a pu tester tous les scénarios, puis les tests, et nous ont proposé des modifications mineures en ce qui concerne le graphique, ainsi qu'une modification majeure qui est la possibilité de pouvoir passer les questions sans y répondre.
L'équipe de testeur a apprécié le site et trouve l'interface ainsi que la plupart des fonctionnalités bien pensées et adaptées.
```
[Vidéo équipe Compagnon-mémoire](https://youtu.be/LGGd35MSQNw)

<u>**L'équipe Klamar**</u>

```
Une personne de cette équipe a testé notre site en suivant la plupart des scénarios de façon autonome et a relevé des éléments similaires à l'équipe Compagnon-mémoire tout en relevant quelques bugs que nous n'avions pas repérés.
```
[Vidéo équipe Klamar](https://youtu.be/-nEbD85Fn2Q)

### Résultats et Analyse

Suite aux tests des utilisateurs, nous avons collectés leurs retours et nous sommes mis à l'implémentation des nouvelles fonctionnalités, ainsi qu'à la résolution des différents bugs qui ont pu être trouvés.

Grâce aux tests et aux remarques faites par les utilisateurs, nous avons pu effectuer différentes modification pour notre site, à savoir :

>Déplacer le bouton de tutoriel dans la liste des quiz au lieu de le mettre pendant les quiz.

>Augmenter la taille du texte à différents endroit comme : dans les indices, dans le message de félicitations, dans les pages de création et de modification d'un profil, dans les statistiques.

>Pouvoir retourner à un quiz abandonné en cours de route.

>Ajouter une option pour les patients permettant de passer une question sans y répondre.

>Mettre le bouton de passage de la liste des quiz à la page principale visible si le profil choisit est un membre du personnel.

>Mettre les photos dans le serveur pour ne pas avoir un simple lien dans le front vers des photos déjà enregistrées.

>Refaire l'interface graphique de la liste des quiz afin que ceux-ci soient rangés par thème.

>Harmoniser l'interface en faisant des cartes de quiz de même hauteur.

>Mettre en valeur le tutoriel et les félicitations en mettant moins de texte.

>Mettre les boutons de retour à la page précédente en haut de la page et non en bas.

>Enlever les boutons d'ajout et de suppression d'indices dans la gestion des quiz.

>La résolution de différents bugs : <br/>
• Le bouton d'indice qui ne supprime pas une mauvaise réponse pour les questions sans indices textuels.<br/>
• Ne pas pouvoir ajouter un thème déjà existant.<br/>
• Le fait que les checkbox du composant pour ajouter une nouvelle question aient un impact sur les checkbox pour modifier une question (si une checkbox est cochée, les autres doivent automatiquement se décocher).

>Ainsi que différentes modifications mineures pour l'interface qui permettent à l'utilisateur de mieux comprendre le fonctionnement du site comme le nom d'un bouton ou la reformulation du nom d'une option.

### Conclusion

```
Cette évaluation coopérative nous aura permit de tester le site d’un point de vue extérieur. Hormis quelques bugs, la grande majorité des remarques concernent le graphisme et non les fonctionnalités. Tous les bugs sont aujourd’hui corrigés et la totalité des modifications graphiques proposées par les testeurs ont été mises en place. De plus, de nouvelles fonctionnalités ont vu le jour comme l’enregistrement de photo, l'option permettant de passer une question ainsi que le fait de pouvoir revenir sur un quiz abandonné en cours de route.

En conclusion cet exercice aura été très bénéfique pour notre équipe car il aura permit une amélioration de notre site et la possibilité d’avoir un autre point de vue sur celui-ci. Il nous aura également permit de repérer différents problèmes d'interface que nous n'observions pas de notre point de vue de développeurs.
```

```
Nous avons également pu faire tester notre site à des utilisateurs concrets, qui représente bien plus nos persona car étant réellement atteint de la maladie d'Alzheimer. Ces tests nous ont permis de comprendre que la principale difficulté de notre site vient du fait que les utilisateurs ne savent pas très bien se servir d'une souris. Pour pallier à ce problème, nous avons redéfinit le clic droit de la souris dans les pages de jeu accessibles par les patients. Ainsi, le clic droit dans ces pages n'ouvre pas la fenêtre de fonctionnalités (Copier, coller, imprimer, ...) qui pourrait les perturber, et s'ils cliquent sur un élément avec le clic droit au lieu du clic gauche, cela fonctionne de la même manière. De plus, le message de félicitation a été modifié afin que le fond, qui était la dernière question à laquelle ils ont répondu, n'apparait plus, ce qui enlève toute ambiguïté et distraction.
De plus, avec l'option qui repose les questions mal répondues plus tard, nous avons ajouté le fait que la bonne réponse est mise en évidence au moment de l'erreur, et la mauvaise réponse que l'utilisateur a sélectionné ne sera plus disponible lorsque la question sera reposée.
```

### Ce qu'il reste à faire

Suite à tous ces tests, il y a malheuresement certains éléments qui n'ont pas pu être mis en place pour cause de manque de temps :
>La modification de l'interface de choix du quiz, afin que l'utilisateur n'ait pas besoin de scroller. Nous n'avons pas trouvé de moyen efficace de résoudre ce problème tout en gardant la page fonctionnelle.

>Faciliter le cliquage des boutons quand on joue à un quiz car les utilisateurs cliquent souvent à côté. Pour cela, nous avons pensé à deux façon de résoudre ce problème :<br/>
• Faire qu'un clique dans le vide sélectionne l'élément cliquable le plus proche. Cependant, si l'utilisateur ne sait pas où il clique, le problème reste entier car l'élément finalement sélectionné ne sera pas forcément celui voulu.<br/> 
• Redéfinir les emplacements possibles de la souris sur la page afin qu'elle soit toujours sur un élément cliquable.<br/>
• Utiliser le clavier pour naviguer dans la page avec un moyen graphique de connaitre la case actuellement sélectionnée.

>Permettre aux soignants utilisant notre site de consulter et modifier le mot de passe permettant de passer de l'espace patient à l'espace personnel ('/home/listeQuiz' -> '/home'). Actuellemnt ce mot de passe est prédéfinit et n'est pas modifiable.

## TESTS

### Critères de priorisation des tests

>Quiz avec les différentes options des patients car c'est l'objectif premier de notre site.

>Vérifier le bon fonctionnement des statistiques.

>Cycle complet du site : création d'un profil, création d'un quiz, jouer à ce quiz avec le profil créé, voir que les stats sont bien modifiées.


### Scénarios de tests

>Nos scénarios s'exécutent dans un ordre précis afin de pouvoir tester le cycle complet de notre site.

1er scénario : Page d'accueil (DONE)
```
Ce scénario consiste à tester les différents bouton du menu principal et à vérifier que la barre de recherche de profil est disponible quand on clique sur le bouton 'Jouer à un quiz'.
Ce scénario permet de vérifier le bon fonctionnement des différentes redirections, permettant ainsi de réaliser n'importe quelle action sur notre site.
```

2ème scénario : Gestion des quiz (DONE)
```
Ce scénario sert à la création d'un quiz, en ajoutant un nouveau thème. Il permet également de vérifier la recherche d'un quiz par nom ou par thème. Et enfin, il permet de vérifier le bon fonctionnement de la suppression d'un quiz.
Ce scénario nous permet donc de tester l'initialisation des quiz, ainsi que leur recherche permettant de les sélectionner pour les modifier ou les supprimer.
```

3ème scénario : Edition des quiz (DONE)
```
Ce scénario permet de vérifier, après la création d'un quiz, l'édition de celui-ci, en lui ajoutant et/ou modifiant des questions. Il permet de vérifier que ces questions contiennent bien un label, 4 réponses et 3 indices facultatifs. La modification des questions permet de modifier chacune de ces valeurs tout en vérifiant la présence de celles obligatoires.
Ce scénario permet également de modifier les informations du quiz, à savoir, son thème et son nom en vérifiant une fois de plus la présence de ces deux éléments. Enfin, on teste la suppression d'une question.
Ce scénario complète donc le précédent en permettant une vérification de la création jusqu'à la finalisation d'un quiz.
```

4ème scénario : Gestion et édition des profils (DONE)
```
Ce scénario englobe toutes les fonctionnalités liées à la gestion et l'édition des profils, à savoir :
• La création, en vérifiant la présence des informations minimales.
• La modification, en vérifiant la présence de ces mêmes informations, et en constatant la présence des anciennes valeurs. De plus, on teste l'édition du profil.
• La suppression d'un profil
Ce scénario nous permet de vérifier le bon fonctionnement de la gestion des profils qui est un élément important pour pouvoir suivre les statistiques des patients possédant un profil sur le site, et également pour le choix des différentes options disponibles pour chaque patient, pour une meilleure personnification de chaque profil.
```

5ème scénario : Statistiques de base (DONE)
```
Ce scénario permet de vérifier les statistiques actuelles avant de jouer à un quiz. On y regarde les statistiques globales qui répertorient le nombre de patient, le nombre de quiz et le nombre de quiz réalisés. On regarde également les statistiques d'un patient et d'un quiz, ce qui permettra plus tard de constater l'actualisation des statistiques.
Ce scénario fonctionne donc de pair avec le 8ème qui permettra de constater qu'il y a bien une actualisation des statistiques. Il est donc très important pour le suivi des patients.
```

6ème scénario : Jouer un quiz avec les options 'photo', 'indice' et 'enlever la mauvaise réponse'(DONE)
```
Ce scénario nous permet de jouer avec le profil 'Huguette'. Il va donc permettre de tester le bon fonctionnement d'un quiz, en demandant occasionnellement des indices, de répondre faux à certaines questions pour vérifier que la question reste identique mais que la mauvaise réponse sélectionnée disparaisse. On teste également le fait de quitter et de revenir sur un quiz, pour constater que la progression a bien été enregistrée. Enfin, on teste que le message des résultats soit bien conforme au modèle prévu suivant les réponses données lors du quiz.
Ce scénario est donc capital pour vérifier le bon fonctionnement du quiz et des différentes options de 'Huguette'.
```

7ème scénario : Jouer un quiz avec les options 'indice', 'passer une question' et 'reposer les questions ratées plus tard' (DONE)
```
Ce scénario permet de tester un quiz en vérifiant que l'on puisse passer une question sans y répondre, et que si l'on se trompe à une question, celle-ci sera reposée à la fin du quiz.
Ce scénario permet de vérifier les options qui n'ont pas été vérifées lors du scénario précédent, ce qui permet nous permet donc de constater que les différentes options du patient sont fonctionnelles.
```

8ème scénario : Actualisation des statistiques (DONE)
```
Ce scénario permet, suite à la réalisation des quiz, de constater l'évolution des statistiques concernant les patients et les quiz qui ont été joué.
Ce scénario permet donc de vérifier un élément clé de notre site, qui sont les statistiques car elles permettent le suivi des patients dans leur évolution contre la maladie d'Alzheimer.
```

## Ops

Le status du livrable est fini, en effet bien que l'on peut toujours améliorer le site en lui même, l'ensemble des issues que nous avions prévues ont été fini et la partie ops est terminée. Nous avons créé nos différents dockerfile dans le front et le back que nous avons relié via des docker-compose. Un pour lancer le site de façon normal et un pour le lancer en faisant passer nos tests. Pour récupérer le bon back-end en fonction de la version lancée, nous avons créé plusieurs environnement que nous gérons dans le package.json et l'angular.json. <br/>Enfin dans nos docker-compose, nous utilisons des healthchecks qui permettent de vérifier l'état de santé des conteneurs afin de vérifier s'ils fonctionnent bien. Nous vérifions grâce à curl l'état de santé du conteneur : curl envoie une requête HTML vers localhost:80 et renvoie une erreur si localhost renvoie 400 ou plus. Nous faisons un test de santé toutes les 1min 30s. Si au lancement de curl après 30s, il n'y a pas de renvoie, on concidère le conteneur comme unhealthy et s'il passe le test 5 fois, il sera considéré comme healthy




## Auteurs :
* Cholewa Théo SI3 à Polytech Nice Sophia, France
* Bottero Adam SI3 à Polytech Nice Sophia, France
* Roques Maxence SI3 à Polytech Nice Sophia, France
* Heilmann Hugo SI3 à Polytech Nice Sophia, France
