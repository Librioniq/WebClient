

Если компонент предпологается что  компонент будет изменять свое состояни в течении его жизненного цикла - тогда компонент должен быть
логически разделен на более простые подкомпоненты и перейти в другое состояни - контейнер.
Контейнер должен состоять из более простых компонентов и должен отыгрывать роль агрегатора - то есть отношение - композиция.
Только контейнер может быть декорирован декораторо @conect и только. Если возникает необходимость применить данный агрегатор на компонент - 
стоит пересмотреть правильность строения данного компонента и разделить его на подкомпоненты, либоже изначально рассматривать его как контейнер.
