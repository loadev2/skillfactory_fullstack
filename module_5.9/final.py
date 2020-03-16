import time

# function decorator
def time_this(num_runs):
    def decorator_func(func):
        def wraped_func():
            t_initial=time.time()
            for i in range(num_runs): 
                func()
            print("Function decorator: Average time for {} runs is {}".format(num_runs, (time.time()-t_initial)/num_runs))
        return wraped_func
    return decorator_func
    

@time_this(num_runs=10)
def f():
    for j in range(1000000):
        pass
    
f()


# class decorator
class time_this_cl(object):
        def __init__(self, num_runs):
            self.num_runs=num_runs;
            self.t0=time.time()
        def __call__(self, func):
            def wrapper():
                for i in range(self.num_runs): 
                    func()
                print("Class decorator: Average time for {} runs is {}".format(self.num_runs, (time.time()-self.t0)/self.num_runs))
            return wrapper

@time_this_cl(num_runs=10)
def f2():
    for j in range(1000000):
        pass
    
f2()


# context manager decorator
class time_this_cm(object):
    """docstring for time_this_cm"""
    def __init__(self, num_runs):
        self.num_runs=num_runs
        self.t0=time.time()
    def __enter__(self):
        pass
    def __exit__(self, *args, **kwargs):
        print("Context Manager decorator (Context manager work): Average time for {} runs is {}".format(self.num_runs, (time.time()-self.t0)/self.num_runs))
        pass
    def __call__(self, func):
        def wrapper():
            for i in range(self.num_runs): 
                func()
            print("Context Manager decorator (Class work): Average time for {} runs is {}".format(self.num_runs, (time.time()-self.t0)/self.num_runs))
        return wrapper


#context manager example         

def f3():
    for j in range(1000000):
        pass

with time_this_cm(num_runs=10) as time_cm:
    for j in range(10):
        f3()

# class decorator example
@time_this_cm(num_runs=10)
def f4():
    for j in range(1000000):
        pass
    
f4() 