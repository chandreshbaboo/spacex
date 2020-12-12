import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpaceProgramsService } from '@core/services/index';
import { CommonConstants } from '@constants/index';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  public programsListing;
  public defaultOptions = {
    limit: CommonConstants.MAGIC_NUMBERS.TWENTY,
    launch_success: true,
    land_success: '',
    launch_year: ''
  };
  public yearFilters = CommonConstants.YEAR_FILTERS;

  constructor(
    private readonly spaceProgramsService: SpaceProgramsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.maintainQueryParams();
  }

  public maintainQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params.limit) {
        this.defaultOptions = {
          ...this.defaultOptions,
          limit: params.limit,
          land_success: params.land_success,
          launch_success: params.launch_success,
          launch_year: params.launch_year
        };
        this.getSpaceProgramsListing(params);
      } else {
        this.getSpaceProgramsListing(this.defaultOptions);
      }
    });
  }

  public getSpaceProgramsListing(params): void {
    this.spaceProgramsService.getSpaceProgramsListing({ ...params }).subscribe((data) => {
      this.programsListing = data;
    });
  }

  public updateRouteQueryParams(params): Promise<boolean> {
    return this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge'
      });
  }

  public getFilteredData(selectedFilter, value): void {
    this.defaultOptions[selectedFilter] = value;
    this.updateRouteQueryParams(this.defaultOptions);
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
    Number(this.defaultOptions.limit) < CommonConstants.MAGIC_NUMBERS.ONE_TWENTY &&
    Number(this.defaultOptions.limit) === this.programsListing?.length) {
      const target = event.target;
      this.defaultOptions = {
        ...this.defaultOptions,
        limit: Number(this.defaultOptions.limit) + CommonConstants.MAGIC_NUMBERS.TWENTY
      };
      this.updateRouteQueryParams(this.defaultOptions);
    }
  }
}
