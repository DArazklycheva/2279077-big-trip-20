import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/point-model.js';
import FiltersModel from './model/filter-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic jjjf456633kflv;vkdj';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteHeader = document.querySelector('.page-header');
const filtersContainer = siteHeader.querySelector('.trip-controls__filters');

const siteMain = document.querySelector('.page-main');
const tripEventsContainer = siteMain.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FiltersModel();

const boardPresenter = new BoardPresenter({
  pointListContainer: tripEventsContainer,
  pointsModel,
  filtersModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filtersPresenter = new FiltersPresenter ({
  filtersContainer,
  filtersModel,
  pointsModel,
});


const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose(){
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick(){
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filtersPresenter.init();
boardPresenter.init();
pointsModel.init();
