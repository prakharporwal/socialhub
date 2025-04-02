# Go Server Profiling Guide  

## Steps to Profile  
  
1. Run the server:  
   ```bash  
   go run main.go  
   ```
2. Start the profiling:  
   ```bash  
   go tool pprof "http://localhost:8080/debug/pprof/profile?seconds=30"  
   ```  
3. Meanwhile, execute the API you want to profile.  
4. After the profile is ready, use the `pdf` command to generate the call graph:  
   ```bash  
   pdf  
   ```  
  
## Additional Resources
- [Profiling in Go with pprof](http://medium.com/@suryaprakashgond/profiling-in-go-with-pprof-cd375d7661ab)  
