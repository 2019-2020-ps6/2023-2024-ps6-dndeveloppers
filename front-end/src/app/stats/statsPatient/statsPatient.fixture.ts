import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Quiz } from "src/models/quiz.model";

export class StatsPatientFixture extends E2EComponentFixture {

    public quizzes: Quiz[] = [];

    getOptions(patientName: string) {
        switch (patientName) {
            case 'Bois, Maurice':
                return "Indice";
            default:
                return "";
        }
    }

    getNbQuizDone(patientName: string) {
        switch (patientName) {
            case 'Bois, Maurice':
                return 2;
            default:
                return 0;
        }
    }

    getMeanScore(patientName: string) {
        switch (patientName) {
            case 'Bois, Maurice':
                return 83.33;
            default:
                return 0;
        }
    }
}