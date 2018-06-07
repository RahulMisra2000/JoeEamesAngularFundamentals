import { VoterService } from "./voter.service";
import { ISession } from "../index";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

describe('VoterService', () => {
  let voterService: VoterService,
    mockHttp;

  beforeEach(() => {
    // Here we are creating an object ( a mock) that will support 2 methods, a delete and a post
    // because the SUT makes http delete and post calls, using HttpClient
    // and we are only testing the service and not the Http calls ..so, we need to mock out the http calls 
    
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
    // If you look at the VoterService code (the SUT - system under Test Here) you will see that it has DI on HttpClient
    // Since we are createing the VoterService object ourselves, we need to provide the arguments .... this is where we 
    // are providing the mock httpclient ...
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {

    it('should remove the voter from the list of voters', () => {
      var session = { id: 6, voters: ['joe', 'john']};
      // Configuring the mock by saying, that delete method of the mock should return an Observable which has a false value
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session, "joe");

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe("john");
    })

    it('should call http.delete with the right URL', () => {
      var session = { id: 6, voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session, "joe");

      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe')

    })
  })

  describe('addVoter', () => {

    it('should call http.post with the right URL', () => {
      var session = { id: 6, voters: ['john']};
      mockHttp.post.and.returnValue(of(false));

      voterService.addVoter(3, <ISession>session, "joe");

      expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object))
    })

  })

})
