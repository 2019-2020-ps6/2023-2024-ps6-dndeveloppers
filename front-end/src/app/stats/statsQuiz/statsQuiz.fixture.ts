import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Quiz } from "src/models/quiz.model";

export class StatsQuizFixture extends E2EComponentFixture {

    public quizzes: Quiz[] = [];

    getPlayedTime(quizName: string) {
        switch (quizName) {
            case 'Calcul mental':
                return 0;
            default:
                return 0;
        }
    }

    getMeanScore(quizName: string) {
        switch (quizName) {
            case 'Calcul mental':
                return 0 + "/" + this.getNbQuestions(quizName);
            default:
                return 0 + "/" + 0;
        }
    }

    getMeanHintUsed(quizName: string) {
        switch (quizName) {
            case 'Calcul mental':
                return 0;
            default:
                return 0;
        }
    }

    getNbQuestions(quizName: string) {
        switch (quizName) {
            case 'Calcul mental':
                return 0;
            default:
                return 0;
        }
    }

    getRouteToQuiz() {
        return this.page.getByRole('button', { name: 'Aller modifier le quiz' });
    }
}