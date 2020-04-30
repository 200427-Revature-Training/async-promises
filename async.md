# Handling Asynchronous Operations

1. Callback Functions - These are the most basic way of handling asynchronous opeartions.  When the asynchronous task is done, the callback function will be called. By using a callback function we can know that the code in the callback function will not be executed until the asynchronous task has completed.

2. Promises - Promises are a newer method of handling asynchronous tasks which have evolved to solve many of the problems that originated with strictly using callback functions. Promises are made and will be completed in the future.  Once completed, promises have two possible results - resolution or rejection.  Resolution is the successful completion of the promised task, rejection is the failure for the promised task to be completed.

3. async/await keywords - These keywords are a fairly new JavaScript syntax can be used to abstract the usage of promises. When used well, asynchronous code looks almost exactly like synchronous code.  This means that the purpose or intent of the code's functionality can be well represented without the added noise of handling asynchonicity within the application.