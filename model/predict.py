import pickle, sys

model = pickle.load(open("model.pkl","rb"))

attendance = float(sys.argv[1])
study = float(sys.argv[2])

pred = model.predict([[attendance,study]])
print("Pass" if pred[0]==1 else "Fail")