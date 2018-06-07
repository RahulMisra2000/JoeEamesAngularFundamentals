import { SessionListComponent } from './session-list.component'
import { ISession } from '../shared/event.model'

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let mockAuthService, 
      mockVoterService;

  beforeEach(() => {
    // First we create the component that we want to test
    // This component's constructor has dependencies, so we provide mock versions of it
    // Note: There is no need to configure the mock BECAUSE the SUT (the ngOnChanges() method of the component)
    //       does not make any calls on these dependencies. If it did, we would need to do something like
    //       jasmine.spyOnObj() ....  etc
    component = new SessionListComponent(mockAuthService, mockVoterService);
  })

  // Note we can nest the describe()
  describe('ngOnChanges', () => {

    it('should filter the session correctly', () => {
      // Now we set the state variables for this component
      // 
      component.sessions = <ISession[]>[
                                          {name: 'session 1', level: 'intermediate'},
                                          {name: 'session 2', level: 'intermediate'},
                                          {name: 'session 3', level: 'beginner'}];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      // SUT --- Here we want to test the ngOnChanges() method of the component.
      component.ngOnChanges();

      // Now we check expectations
      expect(component.visibleSessions.length).toBe(2);
    })

    
    // ANOTHER TEST
    it('should sort the session correctly', () => {
      // Now we set the state variables for this component
      // 
      component.sessions = <ISession[]>[
                                        {name: 'session 1', level: 'intermediate'},
                                        {name: 'session 3', level: 'intermediate'},
                                        {name: 'session 2', level: 'beginner'}];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      // SUT --- Here we want to test the ngOnChanges() method of the component.
      component.ngOnChanges();

      // Now we check expectations
      expect(component.visibleSessions[2].name).toBe('session 3');
    })
  })
})
