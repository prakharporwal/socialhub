run server
then 
`go tool pprof "http://localhost:8080/debug/pprof/profile?seconds=30"`

- meanwhile execute API you want to

after the profile is ready
use pdf command to generate the call graph

- guide: http://medium.com/@suryaprakashgond/profiling-in-go-with-pprof-cd375d7661ab