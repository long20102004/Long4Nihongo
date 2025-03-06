const API_BASE_URL = "http://localhost:8080/admin"; // Replace with your actual API base URL

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getAllCoursesAndData() {
  const response = await fetch(`${API_BASE_URL}/courses`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}

export async function getCourseData(courseId) {
  const response = await fetch(`${API_BASE_URL}/course/${courseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}

export async function getLessonData(lessonId) {
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}
export async function getSectionData(sectionId) {
  const response = await fetch(`${API_BASE_URL}/sections/${sectionId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}
export async function getUserData() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}

export async function addCourse(courseData) {
  const response = await fetch(`${API_BASE_URL}/add-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error("Failed to add course");
  }
  return response.json();
}

export async function updateCourse(courseData) {
  const response = await fetch(`${API_BASE_URL}/update-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error("Failed to update course");
  }
}

export async function updateSection(courseData) {
  const response = await fetch(`${API_BASE_URL}/update-section`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error("Failed to update course");
  }
}
export async function addSection(courseData) {
  const response = await fetch(`${API_BASE_URL}/add-section`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error("Failed to update course");
  }
}

export async function deleteCourse(courseId) {
  const response = await fetch(`${API_BASE_URL}/delete-course/${courseId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete course");
  }
}

export async function addLesson(lessonData) {
  const response = await fetch(`${API_BASE_URL}/add-lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData),
  });
  if (!response.ok) {
    throw new Error("Failed to add lesson");
  }
  return response.json();
}

export async function updateLesson(lessonData) {
  const response = await fetch(`${API_BASE_URL}/update-lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData),
  });
  if (!response.ok) {
    throw new Error("Failed to update lesson");
  }
  return response.json();
}

export async function deleteLesson(lessonId) {
  const response = await fetch(`${API_BASE_URL}/delete-lesson/${lessonId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete lesson");
  }
}
export async function deleteSection(sectionId) {
  const response = await fetch(`${API_BASE_URL}/delete-section/${sectionId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete lesson");
  }
}

export async function addMultipleWords(word) {
  const response = await fetch(`${API_BASE_URL}/update-multiple-word`, {
    method: "POST",
    body: JSON.stringify(word),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete lesson");
  }
}
export async function deleteWord(wordId) {
  const response = await fetch(`${API_BASE_URL}/delete-word/${wordId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete lesson");
  }
}
export async function updateMultipleFlashcard(flashcards) {
  const response = await fetch(`${API_BASE_URL}/update-multiple-flashcard`, {
    method: "POST",
    body: flashcards,
  });
  if (!response.ok) {
    throw new Error("Failed to get lesson data");
  }
}

export async function updateMultipleQuestion(questions) {
  const response = await fetch(`${API_BASE_URL}/update-multiple-question`, {
    method: "POST",
    body: JSON.stringify(questions),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get lesson data");
  }
}
// Add more API functions for other entities (sections, words, flashcards, questions) as needed
