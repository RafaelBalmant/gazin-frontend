import { faker } from '@faker-js/faker'
import Level from '../pages/level'
import Developer from '../pages/developer'

const level = new Level()
const developer = new Developer()
describe('Level', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/main')
  })
  const levelName = faker.random.word()
  it('user register a level', () => {
    level.createLevel(levelName)
  })

  it('user update a level', () => {
    level.updateLevel(levelName)
  })

  it('user delete a level', () => {
    level.deleteLevel(levelName + 'edit')
  })
})

describe('developer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/main')
  })
  const levelName = faker.random.word()

  const currentDeveloper = {
    name: faker.random.word(),
    age: faker.datatype.number({
      min: 10,
      max: 90,
    }),
    hobby: faker.random.word(),
    level: levelName,
    gender: 'masculino',
    birthdate: '19970308',
  }

  it('user register a developer', () => {
    level.createLevel(levelName)
    developer.createDeveloper(currentDeveloper)
    developer.deleteDeveloper(currentDeveloper)
    level.deleteLevel(levelName)
  })

  const newCurrentDeveloper = {
    name: faker.random.word(),
    age: faker.datatype.number({
      min: 10,
      max: 90,
    }),
    hobby: faker.random.word(),
    level: levelName,
    gender: 'masculino',
    birthdate: '19970308',
  }

  it('user edit a developer', () => {
    level.createLevel(levelName)
    developer.createDeveloper(currentDeveloper)
    developer.updateDeveloper(newCurrentDeveloper, currentDeveloper.name)
    developer.deleteDeveloper(newCurrentDeveloper)
    level.deleteLevel(levelName)
  })
})
