import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatsQuizFixture extends E2EComponentFixture {

    getRouteToQuiz() {
        return this.page.getByRole('button', { name: 'Aller modifier le quiz' });
    }
}