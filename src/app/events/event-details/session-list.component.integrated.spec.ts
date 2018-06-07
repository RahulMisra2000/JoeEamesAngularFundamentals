import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { SessionListComponent } from './session-list.component'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { By } from '@angular/platform-browser'
import { DurationPipe } from '../shared/duration.pipe';


describe('SesisonListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    debugEl: DebugElement,            // wrapper around the native element defined below
    element: HTMLElement              // I think this is the top level DOM node in the template (.html)
    

  beforeEach(async(() => {
    let mockAuthService = {
      isAuthenticated: () => true,
      currentUser: {userName: 'Joe'}
    };
    let mockVoterService = {
      userHasVoted: () => true,
    };

    // Think of this as coding the NgModule with only those parts that are needed by the SUT - The SessionListComponent
    //
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        DurationPipe,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService },
      ],
      // What this NO_ERRORS_SCHEMA means is that in the template if you find other components or pretty much any HTML, etc
      // that you cannot render then just ignore and continue.
      // USE CASE: The SessionListComponent which we are testing ... its template has other components as well and we don't 
      // want to test them in this test so we are telling angular to ignore them .... This is how you do Shallow Integrated Tests
      
      // If you want to do a DEEP Integrated test then remove the NO_ERRORS_SCHEMA and list all the other components that are in the
      // SessionListComponet's template, inside the declaration array above.
      schemas: [NO_ERRORS_SCHEMA]
    })
  }))

  
  // We HAVE to continue in a different beforeEach() because the above beforeEach() is async and it NEEDS TO COMPLETE 
  // before we can create the component below and do the testing ...
  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  })

  describe('initial display', () => {

    it('should have the correct session title', () => {
      // First we populate the @input properties of the SUT
      //
      component.sessions = [{ id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      // Then we call the SUT
      //
      component.ngOnChanges();    // This is the SUT  - the ngOnChanges() method in the SessionListComponent
      
      // We force Change Detection so angular does its thing of binding, etc.
      //
      fixture.detectChanges();

      // Now we want to see if the template does get the new stuff bound to it 
      // 
      // expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    })
  })
})
