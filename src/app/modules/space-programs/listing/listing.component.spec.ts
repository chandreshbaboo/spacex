import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SpaceProgramsService } from '@core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let spaceProgramsService: SpaceProgramsService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListingComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { // Mock
            queryParams: of(
              {
                land_success: true
              }
            ),
            params: of(
              {
                land_success: false
              }
            )
          }
        },
        SpaceProgramsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    spaceProgramsService = TestBed.inject(SpaceProgramsService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('space list on getSpaceProgramsListing called', fakeAsync(() => {
    const spy = spyOn(spaceProgramsService, 'getSpaceProgramsListing')
      .withArgs({ limit: 100 }).and.returnValue(of([]));
    component.getSpaceProgramsListing({ limit: 100 });
    spy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
    fixture.destroy();
    flush();
  }));
});
