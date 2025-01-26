package com.example.demo.service.data_service;

import com.example.demo.model.FlashCard;
import com.example.demo.repository.FlashCardRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class FlashCardService {
    private FlashCardRepository flashCardRepository;
    private MongoTemplate mongoTemplate;
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("isDeleted", 1);
        mongoTemplate.updateFirst(query, update, FlashCard.class);
    }
    public List<FlashCard> findBySectionId(String sectionId) {
        List<FlashCard> flashCards = flashCardRepository.findAllByLessonSectionId(sectionId);
        flashCards.sort(Comparator.comparingInt(FlashCard::getOrder));
        return flashCards;
    }
    public List<FlashCard> findAll(){
        return flashCardRepository.findAll();
    }
    public void save(FlashCard flashCard) {
        if (flashCard.getOrder() == null) {
            long maxOrder = flashCardRepository.count();
            flashCard.setOrder((int) (maxOrder + 1));
        }
        flashCardRepository.save(flashCard);
    }
    public FlashCard findById(String id){
        return flashCardRepository.findById(id).get();
    }
}