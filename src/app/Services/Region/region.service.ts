import {Injectable, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_USE} from '../../ServiceAPI/GeneralAPI';
import {Country} from '../../DemoPages/Tables/dynamic/demo/country';
import {RegionM} from '../../Model/RegionM';
import {SortDirection} from '../../DemoPages/Tables/dynamic/demo/sortable.directive';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {COUNTRIES} from '../../DemoPages/Tables/dynamic/demo/countries';

/*
interface SearchResult {
  regions: RegionM[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(regions: RegionM[], column: string, direction: string): RegionM[] {
  if (direction === '') {
    return regions;
  } else {
    return [...regions].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(region: RegionM, term: string, pipe: PipeTransform) {
  return region.codeRegion.toLowerCase().includes(term)
    || pipe.transform(region.libelleRegionFR).includes(term)
    || pipe.transform(region.libelleRegionEN).includes(term);
}
*/

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  public  host:string= API_USE;

  /*private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _regions$ = new BehaviorSubject<RegionM[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };*/


  constructor(private http:HttpClient) {
    /*this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      //this._regions$.next(result.region);
      this._total$.next(result.total);
    });
    this._search$.next();*/
  }

  /*get countries$() { return this._regions$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }*/

  /*private _search(): Observable<SearchResult> {

    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    this.getRegions().subscribe(
      (region)=>{
        // 1. sort
        let countries = sort((region as RegionM[]), sortColumn, sortDirection);

        // 2. filter
        countries = countries.filter(country => matches(country, searchTerm, this.pipe));
        const total = countries.length;

        // 3. paginate
        countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ countries, total });
      },
      (error)=>{

      }
    )

  }
*/



  public getRegions(){
    return this.http.get(this.host+"/regions");
  }

  saveRegion(dataForm) {
    return this.http.post(this.host+"/regions", dataForm);
  }

  public defineRegionVisuel(Idregion){
    return this.http.get(this.host+"/config/elementStat/region/"+Idregion);
  }

  getAllDepartementByIdRegion(idRegion) {
        return this.http.get(this.host+"/regroup-repartement/"+idRegion);
    }

    updateRegion(id:number, dataForm: any) {
        return this.http.put(`${this.host}/regions/${id}`, dataForm);
    }

    deleteRegion(id: number) {
        return this.http.delete(`${this.host}/regions/${id}`, {responseType:'text'});
    }
}
