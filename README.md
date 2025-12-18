Reutilizo mi anterior repositorio "sistema-de-login-registro" para crear un usuario personalizado que pueda tener su propio diario personal.

Esto fue todo una odisea, principalmente porque recién estoy aprendiendo sobre socket.io xD, usé express para levantar el servidor, socket.io para generar el websocket
(para así tener funcionalidades épicas como que lo que escribís se guarde en el cliente) y por sobretodo usé mongoDB atlas para guardar los datos en una base de datos (valga la redundancia).

Veo a muchos programadores que se extienden muchísimo en su readme hablando de como fue el proceso para hacer su repositorio, todo lo que aprendieron en el camino, etc. Yo sinceramente no lo comparto xD

me da demasiada pereza explicarme y desarrollar todo, pero si tuviese que resumir todo mi desarrollo en una frase es: MALAS PRÁCTICAS

hice todo mal, uno de los problemas que me apareció al hacer la página es que si yo creaba la página "/diario/juan" todas las personas podían entrar a la página, y no sé cosas como autentificación de tokens así que hice una MUY mala práctica... Puse la contraseña como query de la url, de modo en que ahora solo podrán entrar a la página poniendo la contraseña. Es SUPER inseguro lo sé, pero es lo que se me ocurrió, mejor hacer algo malo que no hacer nada no?

y bueno, es super obvio que usé claude.ai para estilizarlo y render como host
