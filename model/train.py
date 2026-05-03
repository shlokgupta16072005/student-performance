from sklearn.linear_model import LogisticRegression
import numpy as np
import pickle

X = np.array([[85,3],[60,1],[78,2],[90,4],[55,1]])
y = [1,0,1,1,0]

model = LogisticRegression()
model.fit(X,y)

pickle.dump(model, open("model.pkl","wb"))