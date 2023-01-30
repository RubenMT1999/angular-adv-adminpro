import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy
{

  public intervalSubs: Subscription;

  constructor(){

/*   this.retornaObservable().pipe(
    //con retry al llegar al 2 nos marcaría el error pero
    //el retry lo captura y en vez de ejecutarse el error va a ejecutar
    //otra vez el obs$
    retry(1)
  ).subscribe({
    //next
    next: valor => console.log('obs$', valor),
    //error
    error: err => console.warn('Error:', err),
    //complete
    complete: () => console.info('Obs terminado')
  }); */

  this.intervalSubs = this.retornaIntervalo()
                        .subscribe(
                          (valor) => console.log(valor)
                      )

}

  ngOnDestroy(): void {
    //para detener la subscripción al destruir el componente.
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo(): Observable<number>{
    
    //take para decir cuantas emisiones del observable quiero.
    return interval(500)
                        .pipe(
                          take(10),
                          map( valor => {return valor + 1;}),
                          filter( valor => ( valor % 2 == 0 ) ? true: false)
                        );
  }



  retornaObservable(): Observable<number>{
    let i = 0;

    return new Observable<number>( observer => {
  
      const intervalo = setInterval( () => {
  
        i++;
        observer.next(i);
  
        if(i==4){
          clearInterval(intervalo);
          observer.complete();
        }
  
        if(i==2){
          clearInterval(intervalo);
          observer.error('Y llegó al valor de 2');
        }
  
      }, 1000)
  
    });

  }


}
