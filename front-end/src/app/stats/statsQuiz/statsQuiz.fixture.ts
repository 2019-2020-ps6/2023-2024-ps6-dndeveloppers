import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { Quiz } from "src/models/quiz.model";

export class StatsQuizFixture extends E2EComponentFixture {

    getRouteToQuiz() {
        return this.page.getByRole('button', { name: 'Aller modifier le quiz' });
    }
}