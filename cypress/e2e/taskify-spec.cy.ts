/// <reference types= "cypress" />

import { URL } from "./config";

describe('template spec', () => {

  beforeEach(() => {
    cy.visit(URL);
  });

  it ("Une appbar est affiché", () => {
    cy.get('.container-fluid')
      .should("be.visible")
      .should("have.text", "Taskify");
  })

  it ("Un champ texte est affiché avec un label correspondant", () => {
    cy.get('#task-name')
      .should("be.visible");
    cy.get('label')
      .should("have.text", "Nom de la tâche")
  });

  it ("Le bouton de remise à zéro est désactivé si aucune tâche", () => {
    cy.get("#reset-btn")
      .should("be.visible")
      .should("be.disabled")
      .should("have.text", "Remettre à zero")
  })

  it ("Ajoute une nouvelle tâche", () => {
    cy.get('#task-name')
      .type("Sauver le monde")

    cy.get("#add-task-form")
      .submit()
    
    cy.get('.form-check')
      .should("be.visible");

    cy.get("#reset-btn")
      .should("not.be.disabled")
  });
});
