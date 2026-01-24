#def add(a, b):
#    return a + b

#print(add(2, 3))

#--------long function--------

# def long_function():
#     a = 1
#     b = 2
#     c = 3
#     d = 4
#     e = 5
#     f = 6
#     g = 7
#     h = 8
#     i = 9
#     j = 10
#     k = 11
#     l = 12
#     m = 13
#     n = 14
#     o = 15
#     p = 16

# long_function()



#------- nested loop--------

# def loop_example():
#     for i in range(5):
#         for j in range(3):
#             print(i, j)

#     while True:
#         for k in range(2):
#             print(k)
#         break

# loop_example()


# def sample():
#     x = 10      # unused
#     y = 20
#     z = 30      # unused
#     print(y)

#     for i in range(3):
#         temp = i * 2   # unused
#         print(i)

# sample()


def complex_func(a, b):
    if a > b and b > 0:
        for i in range(a):
            if i % 2 == 0:
                print(i)
    else:
        while b > 0:
            b -= 1

complex_func(5, 3)
