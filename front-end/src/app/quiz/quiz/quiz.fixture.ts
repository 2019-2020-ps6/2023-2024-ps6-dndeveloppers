import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizFixture extends E2EComponentFixture {
    getIndiceBouton() {
        return this.page.getByRole('button', { name: 'Indice' });
    }
    countNbAnswer() {
        return this.page.getByTestId('boutonReponse').count();
    }

    getSkipButton() {
        return this.page.getByRole('button', { name: 'Passer la question' });
    }

    getReturnButton() {
        return this.page.getByRole('button', { name: 'Retour page des quiz' });
    }

    getGetBackButton() {
        return this.page.getByRole('button', { name: 'Reprendre' });
    }

    getStartOverButton() {
        return this.page.getByRole('button', { name: 'Recommencer' });
    }
}

