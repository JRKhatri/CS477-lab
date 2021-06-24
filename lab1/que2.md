# Lab 1 
*_Exercise 2_*
1. _Explain why do we want sometimes to use setImmediate instead of using setTimeout?_
 The callback of setTimeout are registered in the timer phase of event loop and are schedule on this phase after specific time.The callback of setImmediate are immediately  register in check phase without any waiting time.
 
 
 The event loop executes from the timers phase where the setTimeout callbacks are registered and get executed first. In some condition if we need to execute something before the close phase then we use setImmediate. If the setTimeout and setImmediate are called within I/O cycle, the the callback of setImmediate is executed before the setTimeout callbacks.

 2. _Explain the difference between process.nextTick and setImmediate?_
 

 process.nextTick : process.nextTrick is technically not the part of eventloop as it is not natively provided by the # livuv but implemented in the Node.
 It adds the callback into the nextTick queue.
 It has the highest priority before event loop and executes after current operation completes as node processes  all the callbacks in the nextTick queue.  callbacks of process.nextTick get chance to execute phase of event loop.

 setImmediate : It get processed and executed in the event loop. The callback register in by setImmediate is executed in check phase. During the execution if there are many callback register in by in check phase than then the system will execute the limited callback of setImmediate and remaining will run in different times iteration of event loop.

 3. _Name 10 global modules/methods available in Node environment._
    Array, Function,  https, Promise, require, console, setTimeout, setInterval, module, buffer.
 

