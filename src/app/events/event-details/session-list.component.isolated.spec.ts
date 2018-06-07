import { SessionListComponent } from './session-list.component'
import { ISession } from '../shared/event.model'

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let mockAuthService, 
      mockVoterService;

  beforeEach(() => {
    // First we create the component that we want to test
    component = new SessionListComponent(mockAuthService, mockVoterService);
  })

  // Note we can nest the describe()
  describe('ngOnChanges', () => {

    it('should filter the session correctly', () => {
      component.sessions = <ISession[]>[
                                          {name: 'session 1', level: 'intermediate'},
                                          {name: 'session 2', level: 'intermediate'},
                                          {name: 'session 3', level: 'beginner'}];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      // Here we want to test the ngOnChanges() method of the component.
      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    })

    it('should sort the session correctly', () => {
      component.sessions = <ISession[]>[{name: 'session 1', level: 'intermediate'},
        {name: 'session 3', level: 'intermediate'},
        {name: 'session 2', level: 'beginner'}];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe('session 3');
    })
  })
})
